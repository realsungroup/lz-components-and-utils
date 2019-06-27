import React from 'react'
import { Select, Tabs, Radio, Button } from 'antd'

const { TabPane } = Tabs

export default class EmailSelect extends React.Component<any, any> {

    state = {
        isSelectOpen: false
    }

    render() {
        const mapData = {};
        this.props.data.forEach(element => {
            if (mapData[element.ColResDataSort]) {
                mapData[element.ColResDataSort].push(element)
            } else {
                mapData[element.ColResDataSort] = [element]
            }
        });

        console.log('select onChange', this.props.onChange)

        return (
            <Select
                style={{ width: 300 }}
                notFoundContent=""
                open={this.state.isSelectOpen}
                onFocus={() => this.setState((prevState: any, porps) => ({ isSelectOpen: !prevState.isSelectOpen }))}
                dropdownRender={menu => (
                    <div>
                        {/* onChange={callback} */}
                        <Tabs defaultActiveKey="1" >
                            {Object.keys(mapData).map(item => (
                                <TabPane tab={item} key={item}>
                                    <Radio.Group onChange={this.props.onChange}>
                                        {mapData[item].map(({ ColDispName, ColName }) => (
                                            <Radio style={{display: 'block'}} value={ColName}>
                                                {ColDispName}
                                            </Radio>
                                        ))}
                                    </Radio.Group>
                                </TabPane>
                            ))}
                        </Tabs>
                        <Button onClick={() => {
                            this.props.onClick()
                            this.setState({ isSelectOpen: false })
                        } 
                        }>确认选择</Button>
                    </div>
                )}
            />
        )

    }
}