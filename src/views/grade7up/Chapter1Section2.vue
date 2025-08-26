<template>
  <div class="section-content">
    <h2 class="section-title">1.2 有理数及其大小比较</h2>
    <div class="intro" style="margin-bottom: 18px;">
      引入负数后，数的范围就扩大了。与小学对数的学习类似，我们进一步在这个范围内学习数的表示以及大小比较等问题。
    </div>
    <h3 style="font-size:1.18rem;color:#222;margin:18px 0 10px 0;">1.2.1 有理数的概念</h3>
    <ThinkingCard title="思考">
      <div>
        在小学阶段和上一节中，我们认识了很多数。回想一下，到目前为止，我们认识了哪些数？
      </div>
    </ThinkingCard>
    <div class="paragraph">
      <p>我们学过正整数，如1，2，3，…；0；负整数，如-1，-2，-3，…；正整数、0、负整数统称为整数。</p>
      <p>我们还学过分数，如
        <MathJax :content="'\\frac{1}{2}'" />，
        <MathJax :content="'\\frac{2}{3}'" />，
        <MathJax :content="'\\frac{15}{7}'" />，5.32，0.3，…；负分数，如-
        <MathJax :content="'\\frac{2}{3}'" />，-
        <MathJax :content="'\\frac{1}{7}'" />，-0.5，-150.5，…它们都是分数。
      </p>
      <p>进一步地，整数可以写成正分数的形式，例如2=
        <MathJax :content="'\\frac{2}{1}'" />，负整数可以写成负分数的形式，例如-3=
        <MathJax :content="'-\\frac{3}{1}'" />，0也可以写成分数的形式
        <MathJax :content="'\\frac{0}{1}'" />。这样，整数可以写成分数的形式。
      </p>
      <p>可以写成分数形式的数称为<b style="color:#1e88c7">有理数</b>（rational number）。其中，可以写成正分数形式的数为正有理数，可以写成负分数形式的数为负有理数。</p>
      <p>这样，引入负数后，我们对数的认识就扩大到了有理数范围。</p>
    </div>
    <ExampleCard title="例1">
      <div>指出下列各数中的正有理数、负有理数，并分别指出其中的正整数、负整数。</div>
      <div class="example-content" style="margin-top:8px;">
        <span>3，4，<MathJax :content="'\\frac{8}{5}'" />，8.5%，-1，0，-12，-7，-2.5，-60，1.2。</span>
      </div>
      <div class="example-answer" style="margin-top:8px;">
        <b>解：</b><br>
        正有理数：3，4，<MathJax :content="'\\frac{8}{5}'" />，8.5%，1.2；其中正整数有3，4。<br>
        负有理数：-1，-12，-7，-2.5，-60；其中负整数有-1，-12，-7，-60。
      </div>
    </ExampleCard>
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>练习</span>
      </template>
      <ol style="margin-left:1.2em;">
        <li>所有正有理数组成正有理数集合，所有负有理数组成负有理数集合，所有有理数组成有理数集合。把下面的有理数填入它们应属的集合内：<br>
          <span style="display:inline-block;margin-top:4px;">9，-5，0.7，-0.5，7.6，-12，-4.2，4.3。</span><br>
          正有理数集合：<span class="blank"></span>；<br>
          负有理数集合：<span class="blank"></span>；<br>
          有理数集合：<span class="blank"></span>。
        </li>
        <li>指出下列各数中的正有理数、负有理数、整数：<br>
          <span style="display:inline-block;margin-top:4px;">3，-4，0，<MathJax :content="'\\frac{5}{9}'" />，-1.3，10。</span>
        </li>
        <li>3，4，7，50，-13.2，-11，-5%，6.3，2.022中，正有理数的个数为<span class="blank"></span>，其中正整数的个数为<span class="blank"></span>，负有理数的个数为<span class="blank"></span>，其中负整数的个数为<span class="blank"></span>。</li>
      </ol>
    </BorderCard>
    <h3 style="font-size:1.18rem;color:#222;margin:32px 0 10px 0;">1.2.2 数轴</h3>
    <div class="paragraph">
      <p>在小学，我们曾经在有刻度的直线上表示出0和正数，并借助这种图形来直观理解和分析问题。下面我们在此基础上进一步表示有理数。看下面的问题。</p>
    </div>
    <ThinkingCard title="思考">
      <div>
        在一条东西向的马路旁，有一个平行标牌、汽车站牌和3m、和7.5m处分别有一棵柳树和一根交通标志杆，汽车站牌间3m和4.8m处分别有一棵柳树和一根电线杆。试画图表示这一情境。
      </div>
    </ThinkingCard>
    <div class="img-row" style="margin:18px 0 8px 0;">
      <!-- 图1.2-1 占位，可替换为实际图片 -->
      <div style="width: 100%;text-align: center;margin-top: 20px;">
          <img src="@/assets/grade7up/1.2-1.png" style="width:100%;" v-viewer />
        </div>
     
    </div>
    <div class="paragraph">
      <p>在上述方法下，我们就可以把柳树、交通标志杆、槐树、电线杆与汽车站牌的相对位置关系表示出来了。例如，3表示位于汽车站牌向东侧3m处的柳树的位置，-4.8表示位于汽车站牌西侧4.8m处的电线杆的位置等。</p>
    </div>
    <ThinkingCard title="思考">
      <div>
        图1.2-3中的温度计可以看作表示数轴，0和每刻度表示什么？它和图1.2-2有什么共同点？
      </div>
    </ThinkingCard>
    <div class="img-row" style="margin:18px 0 8px 0;">
      <div style="width: 100%;text-align: center;margin-top: 20px;">
          <img src="@/assets/grade7up/1.2-2.png" style="width:100%;" v-viewer />
          <div style="text-align:center">图1.2-2</div>
        </div>    </div>
    <div class="paragraph">
      <p>在数学中，可以用一条直线上的点表示数，它满足以下两个条件：</p>
      <ol style="margin-left:1.2em;">
        <li>在直线上任取一点表示数0，这个点叫作<b style="color:#1e88c7">原点</b>（origin）。</li>
        <li>通常规定直线上从原点向右（或上）为正方向，从原点向左（或下）为负方向。</li>
        <li>选取适当的长度为单位长度，直线上从原点向右，每隔一个单位长度取一个点，依次表示1，2，3，…；从原点向左，依次表示-1，-2，-3，…。</li>
      </ol>
      <p>像这样，规定了原点、正方向和单位长度的直线叫作<b style="color:#1e88c7">数轴</b>（number axis）。</p>
      <p>有理数可以用数轴上的点表示，例如，在数轴的正半轴上，距离原点6.5个单位长度的点表示数6.5；在数轴的负半轴上，距离原点-<MathJax :content="'\\frac{3}{2}'" />个单位长度的点表示数-<MathJax :content="'\\frac{3}{2}'" />。</p>
    </div>
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>练习</span>
      </template>
      <ol style="margin-left:1.2em;">
        <li>如图，写出数轴上点A、B、C、D、E表示的数。
          <div style="width:100%;height:40px;background:#f5faff;border-radius:8px;text-align:center;line-height:40px;color:#bbb;margin:8px 0;">[图1.2-2 数轴点标记图占位]</div>
        </li>
        <li>画出数轴，并在数轴上表示下列有理数：-5，-3.5，<MathJax :content="'\\frac{7}{2}'" />，-1，<MathJax :content="'\\frac{5}{9}'" />，2。</li>
        <li>在数轴上，表示-2与4间的点（包括这两个点）有<span class="blank"></span>个点表示的数是整数。它们表示的数分别是<span class="blank"></span>，其中负整数有<span class="blank"></span>个。</li>
        <li>在数轴上，点A表示的数是-3，从点A出发，沿数轴向某一方向移动4个单位长度到达点B，则点B表示的数是多少？</li>
      </ol>
    </BorderCard>
    <h3 style="font-size:1.18rem;color:#222;margin:32px 0 10px 0;">1.2.3 相反数</h3>
    <ThinkingCard title="探究">
      <div>
        在数轴上，与原点的距离是3的点有几个？这些点分别表示什么数？这些数之间有什么关系？与原点的距离是<MathJax :content="'\\frac{1}{2}'" />的点呢？
      </div>
    </ThinkingCard>
    <div class="paragraph">
      <p>可以发现，数轴上与原点的距离是3的点有两个，它们表示的数是3和-3，这两个数只有符号不同；与原点的距离是<MathJax :content="'\\frac{1}{2}'" />的点也有两个，它们表示的数是<MathJax :content="'\\frac{1}{2}'" />和-<MathJax :content="'\\frac{1}{2}'" />。这样只有符号不同的两个数，互为<b style="color:#1e88c7">相反数</b>（opposite number）。</p>
      <p>0的相反数是0。</p>
      <p>一般地，a和-a互为相反数。这里，a表示任意一个数，可以是正数、负数，也可以是0。例如，a=1时，-a=-1，1和-1互为相反数；同理，-a=-1时，a=1，-1和1互为相反数。</p>
    </div>
    <ExampleCard title="例3">
      <div>（1）分别写出7和<MathJax :content="'\\frac{4}{3}'" />的相反数；<br>（2）a的相反数是2.4，写出a的值。</div>
      <div class="example-answer" style="margin-top:8px;">
        <b>解：</b><br>
        （1）7的相反数是-7，<MathJax :content="'\\frac{4}{3}'" />的相反数是-<MathJax :content="'\\frac{4}{3}'" />。<br>
        （2）因为2.4与-2.4互为相反数，所以a的值是-2.4。
      </div>
    </ExampleCard>
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>练习</span>
      </template>
      <ol style="margin-left:1.2em;">
        <li>判断题：<br>
          （1）0是相反数；（2）6是相反数；（3）-6的相反数是6；（4）6与-6互为相反数；（5）正数和负数互为相反数；（6）任何一个数都有相反数。
        </li>
        <li>
          <div>写出下列各数的相反数：<br />
            8，-3.5，
            <span><MathJax :content="'\\frac{2}{11}'" /></span>，-6，0，
            <span><MathJax :content="'\\frac{5}{9}'" /></span>。
          </div>
        </li>
        <li>如果a是一个有理数，a的相反数在数轴上的位置和a有什么关系？</li>
        <li>化简下列各式：<br>
          -（-3.8），-（-2），-（-6），-（+3.8）。
        </li>
      </ol>
    </BorderCard>

    <h3 style="font-size:1.18rem;color:#222;margin:32px 0 10px 0;">1.2.4 绝对值</h3>
    <div class="paragraph">
      <p>我们知道，互为相反数的两个数（除0以外）只有符号不同。这两个数的相同部分在数轴上表示什么？</p>
      <p>看一个具体例子。-10和10互为相反数，在数轴上分别用点A、B表示这两个数，可以发现，点A、B与原点的距离都是10。因此|-10|=10，|10|=10。</p>
      <p>一般地，数轴上表示数a的点与原点的距离叫作数a的<b style="color:#1e88c7">绝对值</b>（absolute value），记作|a|。</p>
      <p>显然|0|=0。</p>
    </div>
    <ThinkingCard title="探究">
      <div>
        一个数的绝对值与这个数有什么关系？借助数轴多取几个数试一试，看看能不能发现规律。
      </div>
    </ThinkingCard>
    <div class="paragraph">
      <p>可以得出：<b style="color:#1e88c7">一个正数的绝对值是它本身；一个负数的绝对值是它的相反数；0的绝对值是0。</b></p>
      <ol style="margin-left:1.2em;">
        <li>如果a>0，那么|a|=a；</li>
        <li>如果a=0，那么|a|=0；</li>
        <li>如果a<0，那么|a|=-a。</li>
      </ol>
    </div>
    <ExampleCard title="例4">
      <div>（1）写出-1，-0.5，<MathJax :content="'\\frac{7}{4}'" />的绝对值；<br>（2）如图1.2-8，数轴上点a、b、c、d分别表示有理数a、b、c、d，这四个数中，绝对值最小的是哪个？</div>
      <div class="example-answer" style="margin-top:8px;">
        <b>解：</b><br>
        （1）<MathJax :content="'|-1|=1'" />，<MathJax :content="'|-0.5|=0.5'" />，<MathJax :content="'|\\frac{7}{4}|=\\frac{7}{4}'" />。<br>
        （2）因为在A、B、C、D中，点C离原点最近，所以在有理数a、b、c、d中，c的绝对值最小。
      </div>
    </ExampleCard>
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>练习</span>
      </template>
      <ol style="margin-left:1.2em;">
        <li>
          <div>写出下列各数的绝对值：<br />
            8，-3.9，-
            <span><MathJax :content="'\\frac{2}{11}'" /></span>，100，7.5，0，-13，(+18)。
          </div>
        </li>
        <li>
          <div>判断题：<br />
            （1）绝对值是它本身的数是正数；（2）当a≠0时，<span><MathJax :content="'|a|>0'" /></span>；（3）绝对值小于0的数是-1和-1；（4）如果<span><MathJax :content="'|a|=2'" /></span>，那么a=2；（5）如果m是负数，<span><MathJax :content="'|m|=10'" /></span>，那么m=__。
          </div>
        </li>
        <li>
          <div>化简下列各式：<br />
            +<span><MathJax :content="'|-3.5|'" /></span>，-<span><MathJax :content="'|\\frac{5}{6}|'" /></span>，<span><MathJax :content="'|+11|'" /></span>，<span><MathJax :content="'|+(-15)|'" /></span>，<span><MathJax :content="'|(-1)|'" /></span>，<span><MathJax :content="'|(-9)|'" /></span>，-<span><MathJax :content="'|+(9)|'" /></span>。
          </div>
        </li>
      </ol>
    </BorderCard>
    <h3 style="font-size:1.18rem;color:#222;margin:32px 0 10px 0;">1.2.5 有理数的大小比较</h3>
    <ThinkingCard title="思考">
      <div>
        对于正数、0和负数这三类数，它们之间有何大小关系？两个负数之间如何比较大小？前面最低气温从低到高的排序与你的结论一致吗？
      </div>
    </ThinkingCard>
    <div class="paragraph">
      <p>一般地：</p>
      <ol style="margin-left:1.2em;">
        <li>正数大于0，0大于负数，正数大于负数；</li>
        <li>两个负数，绝对值大的反而小。</li>
      </ol>
    </div>
    <ExampleCard title="例5">
      <div>比较下列各组数的大小：</div>
      <div class="example-content" style="margin-top:8px;">
        <div>(1) 5 和 -2； (2) -3 和 -7； (3) -1 和 -(+2)； (4) -(–0.5) 和 –1.5。</div>
      </div>
      <div class="example-answer" style="margin-top:8px;">
        <b>解：</b><br>
        (1) 因为正数大于负数，所以5 > -2。<br>
        (2) 先求绝对值，|-3|=3，|-7|=7。因为3 < 7，所以-3 > -7。<br>
        (3) 先化简，-(+2) = -2。因为正数大于负数，所以-1 > -2。<br>
        (4) 先化简，-(–0.5) = 0.5，–1.5 = –1.5。因为0.5 > –1.5，所以–(–0.5) > –1.5。
      </div>
    </ExampleCard>
    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>练习</span>
      </template>
      <ol style="margin-left:1.2em;">
        <li>
          <div>比较下列各组数的大小：<br />
            (1) 3 和 -5；<br /> (2) -3 和 -5；<br /> (3) -2.5 和 <MathJax :content="'-\\frac{1}{4}'" />；<br /> (4) <MathJax :content="'-\\frac{3}{5}'" /> 和 <MathJax :content="'-\\frac{4}{5}'" />； <br />(5) -(+8) 和 -(–9)； <br />(6) -0.3 和 <MathJax :content="'-\\frac{1}{3}'" />。
          </div>
        </li>
        <li>
          <div>将下列各组数按从小到大的顺序排列，并用“<”连接：<br />
            (1) –3，+2，+5，0，–10，8；<br />
            (2) -1，+2.3，0，-3，0.2，<MathJax :content="'\\frac{3}{2}'" />，1。
          </div>
        </li>
        <li>
          <div>下面是我国几个城市某年1月份的平均气温，把这些温度按从高到低的顺序排列。<br />
            北京 –4.6℃，武汉 3.8℃，广州 13.1℃，哈尔滨 –19.4℃，南京 2.4℃。
          </div>
        </li>
      </ol>
    </BorderCard>

    <BorderCard customClass="exercise-border-card">
      <template #title>
        <span>习题 1.2</span>
      </template>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin-bottom:6px;">复习巩固 ▶</div>
      <ol style="margin-left:1.2em;">
        <li>
          <div>把下列各有理数按在相应的集合内：<br />
            <span>
              <span><MathJax :content="'-\\frac{3}{5}'" /></span>，4，0.1，0.45，120，<span><MathJax :content="'-77'" /></span>，<span><MathJax :content="'-2.56'" /></span>，<span><MathJax :content="'-123'" /></span>，<span><MathJax :content="'\\frac{1}{2}'" /></span>，0.3，0。
            </span><br />
            正有理数集合：<span class="blank"></span>；<br />
            负有理数集合：<span class="blank"></span>；<br />
            整数集合：<span class="blank"></span>。
          </div>
        </li>
        <li>
          <div>如图，数轴上点A表示的数是<span class="blank"></span>，点B表示的数是<span class="blank"></span>，点C表示的数是<span class="blank"></span>，点D表示的数是<span class="blank"></span>，点E表示的数是<span class="blank"></span>。<br />
            <div style="width:100%;height:40px;background:#f5faff;border-radius:8px;text-align:center;line-height:40px;color:#bbb;margin:8px 0;">[图2 习题1.2-2 数轴点标记图占位]</div>
          </div>
        </li>
        <li>
          <div>7的相反数是<span><MathJax :content="'-7'" /></span>，<span><MathJax :content="'-\\frac{1}{4}'" /></span>的相反数是<span><MathJax :content="'\\frac{1}{4}'" /></span>，相反数是它本身的数是<span class="blank"></span>。</div>
        </li>
        <li>
          <div>写出下列各数的绝对值，并指出哪个数的绝对值最大，哪个数的绝对值最小：<br />
            <span><MathJax :content="'-9'" /></span>，3，9.75，0.4，<span><MathJax :content="'-\\frac{3}{4}'" /></span>，<span><MathJax :content="'-30.1'" /></span>。
          </div>
        </li>
        <li>
          <div>比较大小：<br />
            (1) <span><MathJax :content="'-2'" /></span> 和 0； (2) <span><MathJax :content="'-1'" /></span> 和 <span><MathJax :content="'+2'" /></span>； (3) <span><MathJax :content="'-6'" /></span> 和 <span><MathJax :content="'-7'" /></span>； (4) <span><MathJax :content="'-\\frac{5}{6}'" /></span> 和 <span><MathJax :content="'-\\frac{1}{2}'" /></span>； (5) 0.3 和 <span><MathJax :content="'-0.31'" /></span>。
          </div>
        </li>
        <li>
          <div>在数轴上表示下列各数：<br />
            <span><MathJax :content="'-4'" /></span>，<span><MathJax :content="'-3'" /></span>，<span><MathJax :content="'-2'" /></span>，0，2.5，3，<span><MathJax :content="'\\frac{1}{2}'" /></span>。
          </div>
        </li>
        <li>
          <div>如果某地温度变化用“××℃”的方式记录温度，例如，–50℃ 近视记录为“–0.50D”，近视100度记录为“–1.00D”，等等。列出6个不同的变化记录方式。
          </div>
        </li>
        <li>
          <div>如果a是一个有理数，a > 0，a 的相反数 <span><MathJax :content="'-a'" /></span>，a 的绝对值 <span><MathJax :content="'|a|=a'" /></span>，a 的相反数的绝对值 <span><MathJax :content="'|-a|=a'" /></span>。</div>
        </li>
      </ol>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin:10px 0 6px 0;">综合运用 ▶</div>
      <ol start="6" style="margin-left:1.2em;">
        <li>
          <div>在数轴上表示下列各数：<br />
            <span><MathJax :content="'-4'" /></span>，<span><MathJax :content="'-3'" /></span>，<span><MathJax :content="'-2'" /></span>，0，2.5，3，<span><MathJax :content="'\\frac{1}{2}'" /></span>。
          </div>
        </li>
        <li>
          <div>如果a是一个有理数，a > 0，a 的相反数 <span><MathJax :content="'-a'" /></span>，a 的绝对值 <span><MathJax :content="'|a|=a'" /></span>，a 的相反数的绝对值 <span><MathJax :content="'|-a|=a'" /></span>。</div>
        </li>
      </ol>
      <div style="color:#1e88c7;font-weight:bold;font-size:1.12rem;margin:10px 0 6px 0;">拓广探索 ▶</div>
      <ol start="8" style="margin-left:1.2em;">
        <li>
          <div>如果a是一个有理数，a > 0，a 的相反数 <span><MathJax :content="'-a'" /></span>，a 的绝对值 <span><MathJax :content="'|a|=a'" /></span>，a 的相反数的绝对值 <span><MathJax :content="'|-a|=a'" /></span>。</div>
        </li>
        <li>
          <div>如果a是一个有理数，a > 0，a 的相反数 <span><MathJax :content="'-a'" /></span>，a 的绝对值 <span><MathJax :content="'|a|=a'" /></span>，a 的相反数的绝对值 <span><MathJax :content="'|-a|=a'" /></span>。</div>
        </li>
      </ol>
    </BorderCard>
  </div>
</template>

<script setup>
import MathJax from '@/components/MathJax.vue'
import ExampleCard from '@/components/ExampleCard.vue'
import BorderCard from '@/components/BorderCard.vue'
import ThinkingCard from '@/components/ThinkingCard.vue'
</script>

<style scoped>
.section-content {
  background: #fff;
  padding: 40px 32px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 40px auto;
  font-size: 1.08rem;
  line-height: 1.9;
}
.section-title {
  color: #0984e3;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px #e3f2fd;
}
.intro {
  font-size: 1.15rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 1.2rem;
}
.blank {
  display: inline-block;
  border-bottom: 1.5px solid #bbb;
  width: 60px;
  height: 1.2em;
  vertical-align: middle;
  margin: 0 4px;
}
.exercise-border-card {
  margin-top: 40px;
  padding: 24px;
  background: #fafdff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 850px;
  margin: 40px auto;
  font-size: 1.08rem;
  line-height: 1.9;
}
</style> 