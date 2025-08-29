import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input, Card, Switch, Space } from 'antd';

const HIGHLIGHT_CLASS = 'x-highlight';

function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function unwrapPreviousHighlights(container: HTMLElement) {
	const nodes = Array.from(container.querySelectorAll(`.${HIGHLIGHT_CLASS}`));
	for (const span of nodes) {
		const parent = span.parentNode;
		if (!parent) continue;
		while (span.firstChild) parent.insertBefore(span.firstChild, span);
		parent.removeChild(span);
	}
}

type IndexRef = { node: Text; offset: number };

// 建立全文字符到(TextNode, localOffset)的映射
function buildIndexMap(container: HTMLElement, skipSelector = `.${HIGHLIGHT_CLASS}`) {
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
		acceptNode(node) {
			// 跳过已高亮区域和不可见文本
			if (
				(node.parentElement && node.parentElement.closest(skipSelector)) ||
				!node.nodeValue ||
				!node.nodeValue.trim()
			) {
				return NodeFilter.FILTER_REJECT;
			}
			return NodeFilter.FILTER_ACCEPT;
		},
	} as any);

	const textNodes: Text[] = [];
	let totalText = '';
	const indexMap: IndexRef[] = [];

	let current: Node | null = walker.nextNode();
	while (current) {
		const tn = current as Text;
		textNodes.push(tn);
		const value = tn.nodeValue ?? '';
		totalText += value;

		for (let i = 0; i < value.length; i++) {
			indexMap.push({ node: tn, offset: i });
		}
		current = walker.nextNode();
	}

	return { totalText, indexMap, textNodes };
}

// 在全局字符索引处执行 split，返回“从该索引开始”的 Text 节点
function splitAt(container: HTMLElement, index: number, indexMap: IndexRef[] | null) {
	if (!indexMap || index < 0 || index >= indexMap.length) return null;
	const { node, offset } = indexMap[index];
	if (!node.nodeValue) return null;
	if (offset === 0) return node;
	return node.splitText(offset);
}

// 包裹 [startIndex, endIndex) 范围
function wrapRange(container: HTMLElement, startIndex: number, endIndex: number, indexMap: IndexRef[]) {
	if (startIndex >= endIndex) return;

	// 先在末尾拆，再在起始拆，避免索引位移影响
	const endRightNode = splitAt(container, endIndex - 1, indexMap);
	const startRightNode = splitAt(container, startIndex, indexMap);
	if (!startRightNode) return;

	// 如果 start/end 在同一原始节点，endRightNode 可能和 startRightNode 同属同一父节点
	// 这时需要再按 endIndex 对 startRightNode 后半部分 split，一般 endRightNode 即已是分隔点

	// 需要包裹的节点序列：从 startRightNode 起，直到 endRightNode 之前
	const nodesToWrap: Node[] = [];
	let cursor: Node | null = startRightNode;
	while (cursor && cursor !== endRightNode) {
		nodesToWrap.push(cursor);
		cursor = cursor.nextSibling;
	}

	if (nodesToWrap.length === 0) return;

	const span = document.createElement('span');
	span.className = HIGHLIGHT_CLASS;
	// 将这些节点移动到 span 中
	const first = nodesToWrap[0];
	first.parentNode?.insertBefore(span, first);
	for (const n of nodesToWrap) {
		span.appendChild(n);
	}
}

function findAllMatches(text: string, keyword: string, caseInsensitive: boolean) {
	if (!keyword) return [];
	const flags = caseInsensitive ? 'gi' : 'g';
	const re = new RegExp(escapeRegExp(keyword), flags);
	const matches: Array<{ start: number; end: number }> = [];
	let m: RegExpExecArray | null;
	while ((m = re.exec(text)) !== null) {
		matches.push({ start: m.index, end: m.index + m[0].length });
		// 防止零宽匹配死循环
		if (m.index === re.lastIndex) re.lastIndex++;
	}
	return matches;
}

export default function CrossTagHighlightPage() {
	const [keyword, setKeyword] = useState('');
	const [caseInsensitive, setCaseInsensitive] = useState(true);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [appliedKeyword, setAppliedKeyword] = useState('');

	// 示例富文本（可替换为接口返回的 HTML）
	const htmlContent = useMemo(
		() =>
			`<p>
				这是一个<strong>跨标签</strong>高亮的示例，用于演示在 <em>多层</em>标签
				<span>混杂</span>的文<span>本</span>中依然可以<span>正</span>确匹配。
				比如：关键字“<b>标签高</b><i>亮</i>”就会跨越 <u>不同</u> 元素。
			</p>
			<p>
				再比如关键字“多层标签”，它可能会跨过 <code>&lt;em&gt;</code> 或 <code>&lt;span&gt;</code>。
			</p>`,
		[]
	);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// 清除旧高亮
		unwrapPreviousHighlights(container);

		if (!appliedKeyword) return;

		// 构建索引映射
		const { totalText, indexMap } = buildIndexMap(container);
		if (!totalText) return;

		// 查找所有匹配
		const matches = findAllMatches(totalText, appliedKeyword, caseInsensitive);
		if (matches.length === 0) return;

		// 从尾到头包裹，避免节点位移影响未处理的范围
		for (let i = matches.length - 1; i >= 0; i--) {
			const { start, end } = matches[i];
			wrapRange(container, start, end, indexMap);
		}
	}, [appliedKeyword, caseInsensitive]);

	return (
		<Card title="跨标签高亮示例" style={{ maxWidth: 900, margin: '24px auto' }}>
			<Space style={{ marginBottom: 12 }} wrap>
				<Input.Search
					allowClear
					style={{ width: 360 }}
					placeholder="输入要高亮的关键词"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					enterButton="确定"
					onSearch={(v) => setAppliedKeyword(v.trim())}
				/>
				<Space>
					<span>忽略大小写</span>
					<Switch checked={caseInsensitive} onChange={setCaseInsensitive} />
				</Space>
			</Space>

			<div
				ref={containerRef}
				style={{
					border: '1px solid #f0f0f0',
					padding: 12,
					borderRadius: 6,
					lineHeight: 1.75,
				}}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>

			<style>{`
				.${HIGHLIGHT_CLASS} {
					background: #fffb8f;
					box-shadow: 0 0 0 1px #ffe58f inset;
				}
			`}</style>
		</Card>
	);
}