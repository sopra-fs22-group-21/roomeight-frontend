import React, { userState } from 'react'
import DatePicker from 'react-native-datepicker'
import styles from './style'


export const DateInput = (props) => {
    const [date, setDate] = useState(null);

    return (<DatePicker
        {...props}
        style={{width: "100%"}}
        date={date}
        mode="date"
        format="DD. MM. YYYY"
        minDate="01. 01. 1999"
        
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.setState({date: date})}}
    />)
}