// 具体面试内容
import { useEffect, useState } from "react"
import { Card } from "antd"
import interviewData from "./interViewData.ts"
// import { InterviewType } from "./type"
import ShowCode from "@/components/showCode"


const InterviewContext = ({ title, contentKey }: { title: string; contentKey: string }) => {
    const keyList = contentKey.split('/')
    const [showData, setShowData] = useState({
        title: '',
        key: '',
        content: [{
            describe: '',
            code: '',
        }],
    })

   const handleDate = () => {
        // 拿到一级目录数据
        const showDataLevelOne = interviewData.filter((item: any) => item.key === keyList[0])
        // 然后获取二级目录数据 也就是最终要展示的数据
        const showDataLevelTwo = showDataLevelOne[0].children.filter((item: any) => item.key === keyList[1])
       console.log(showDataLevelTwo,'showDataLevelTwo')
        setShowData(showDataLevelTwo[0])
    }
    // 初始化数据
    useEffect(() => {
        handleDate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, contentKey])
    return (
        <>
            <Card style={{ width: '100%' }}>
                <div style={{maxHeight: '500px', overflow: 'auto'}}>
                    {showData.content.map((item: any) => (
                        <div key={item.key}>
                            {item.describe.split('\n').map((item, index) => (
                                <div style={{ margin: '10px' }} key={index}>{item}</div>
                            ))}
                            <ShowCode code={item.code} />
                        </div>
                    ))}
                    {/* <ShowCode code={showData.code} /> */}
                </div>
            </Card>
        </>
    )
}

export default InterviewContext