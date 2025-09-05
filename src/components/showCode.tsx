// 展示代码的组件
import { Card } from "antd"

const codeContainer = {
    overflow: "auto",
    width: "100%",
    padding: 10,
    background: "#f7f7f7",
    borderRadius: 5,
}

const ShowCode = ({ code }: { code: string }) => {
    return (
        <Card>
            <div style={codeContainer}>
                <pre>
                    <code>
                        {code}
                    </code>
                </pre>
            </div>
        </Card>
    )
}

export default ShowCode