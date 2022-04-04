import React, {useState} from 'react';
import dateFormat from 'dateformat';
import styles from './style'
import { InputLabel, StyledTextInput , Input} from '../input';
import { TextInput, View } from 'react-native';
import { Box } from '../theme';

export const DateInput = (props) => {
  const [day, setDay] = useState(props.date ? dateFormat(props.date, "dd") : "");
  const [month, setMonth] = useState(props.date ? dateFormat(props.date, "mm") : "");
  const [year, setYear] = useState(props.date ? dateFormat(props.date, "yyyy") : "");

  const isDay = (value) => {
    return !isNaN(value) 
              && value.length<=2 
              && Number(value)<=31
  }
  const isMonth = (value) => {
    return !isNaN(value) 
              && value.length<=2 
              && Number(value)<13 
  }
  const isYear = (value) => {
    return !isNaN(value) 
              && value.length<=4
  }

  const changeDate = (d, m, y) => {
    // create date and validate
    const notEmpty = y && y!="" && m && m!="" && d && d!=""
    const dt = new Date(Date.parse(y+'-'+m+'-'+d));
    const correctNumbers = isYear(y) && isMonth(m) && isDay(d) && !isNaN(dt) &&  Number(y)>1900
    const beforeNow = dt<=new Date()
    const validFebruary = (d<30 || m!=2) && (d<29 || m!=2 || y%4==0)
    const valid = notEmpty && correctNumbers && beforeNow && validFebruary;
    if(valid){
      props.onChange(dt, true);
    } else {
      props.onChange(null, false);
    }
    setYear(y)
    setDay(d)
    setMonth(m)
  }
  
  return (
    <Box>
      <InputLabel label={props.label}/>
      <View style={styles.row}>
        <StyledTextInput
            style={[styles.day, props.error ? styles.error : {}, props.style, props.valid ? styles.valid : {}]}
            placeholder="dd"
            keyboardType="number-pad"
            value={day}
            onChangeText={ (text) => {
              if(isDay(text)) {
                  changeDate(text, month, year)
              }
            }}
            onEndEditing={event => {
              let num = event.nativeEvent.text;
              if(Number(num)<10 && Number(num)>0 && num!="" && num.length<2) num = "0"+num;
              changeDate(num, month, year);
            }}
        />
        <StyledTextInput
            style={[styles.month, props.error ? styles.error : {}, props.style, props.valid ? styles.valid : {}]}
            keyboardType="number-pad"
            placeholder="mm"
            value={month}
            onChangeText={ text => {
                if(isMonth(text)){
                    changeDate(day, text, year)
                }
            }}
            onEndEditing={event => {
              let num = event.nativeEvent.text;
              if(Number(num)<10 && Number(num)>0 && num!="" && num.length<2) num = "0"+num;
              changeDate(day, num, year)
            }}
        />
        <StyledTextInput
            style={[styles.year, props.error ? styles.error : {}, props.style, props.valid ? styles.valid : {}]}
            placeholder="yyyy"
            keyboardType="number-pad"
            value={year}
            onChangeText={ text => {
              if(isYear(text)){
                changeDate(day, month, text)
              }
            }}
        />
      </View>
    </Box>
  )
}
  

export default DateInput;
