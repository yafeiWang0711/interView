import React from "react";
import type { Person } from "@/types/interface";

class MyCC extends React.Component<Person> {
    // static defaultProps = {
    //     sex: '男',
    // }
    constructor(props: Person) {
        super(props);   
        console.log(props);
    }
    
  render() {

    return (
        <div>
            <div>name: {this.props.name}</div>
            <div>age: {this.props.age}</div>
            <div>sex: {this.props.sex}</div>
        </div>
    );
  }
}

export default MyCC;