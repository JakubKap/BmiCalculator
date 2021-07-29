import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

class App extends Component {
   state = {
    weightText: "",
    heightText: "",
    isBmiCalculated: false,
    roundedBmiValueToTwoDecimalPlaces: "",
    assignedBmiCategory: ""
   }

   heightTextInputRef = React.createRef();
   weightTextInputRef = React.createRef();

  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to BMI calculator. Please, type your weight and height.</Text>
      <TextInput
        style={styles.textInput}
        ref = {this.weightTextInputRef}
        placeholder = "Type your weight in kilograms (e.g. 60)"
        onChangeText = {typedWeightText => {this.setWeight(typedWeightText)}}
      />
      <TextInput
        style={styles.textInput}
        ref = {this.heightTextInputRef}
        placeholder = "Type your height in meters (e.g. 1.70)"
        onChangeText = {typedHeightText => {this.setHeight(typedHeightText)}}
      />
      <View style = {{flexDirection: "row"}}>
        <View style = {styles.basicButton}>
          <Button 
            style={styles.basicButton}
            onPress={this.calculateAndDisplayBmiWithCategory}
            title = "Calculate your BMI"
          />
        </View>
        <View style = {styles.specialButton}>
          <Button
            style={styles.specialButton}
            color = '#bf3232'
            onPress={this.clearCriterias}
            title = "Clear criterias"
          />
        </View>
      </View>
      {this.state.isBmiCalculated ? 
        <Text style={styles.footerText}>Your BMI is <i>{this.state.roundedBmiValueToTwoDecimalPlaces} </i></Text> : null}
      {this.state.isBmiCalculated ? 
        <Text style={styles.footerText}>Your BMI category is <i>{this.state.assignedBmiCategory} </i> </Text> : null}
    </View>
  )
}

setWeight (typedWeightText) {
  this.state.weightText = typedWeightText;
}

setHeight (typedHeightText) {
  this.state.heightText = typedHeightText;
}

calculateAndDisplayBmiWithCategory = () => {
  this.calculateBmi();
  this.assignBmiCategory();
  this.displayBmiAndAssignedCategory();
}

calculateBmi = () => {
  var calculatedBmiValue = this.state.weightText / Math.pow(this.state.heightText, 2);
  this.state.roundedBmiValueToTwoDecimalPlaces = Math.round(calculatedBmiValue * 100) / 100;
}

assignBmiCategory = () => {
  if (this.state.roundedBmiValueToTwoDecimalPlaces < 16)
    this.state.assignedBmiCategory = "Underweight (Severe thinness)";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 16.9)
    this.state.assignedBmiCategory = "Underweight (Moderate  thinness)";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 18.4)
    this.state.assignedBmiCategory = "Underweight (Mid  thinness)";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 24.9)
    this.state.assignedBmiCategory = "Normal range";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 29.9)
    this.state.assignedBmiCategory = "Overweight (Pre-obese)";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 34.9)
    this.state.assignedBmiCategory = "Obese (Class I)";
  else if (this.state.roundedBmiValueToTwoDecimalPlaces <= 39.9)
    this.state.assignedBmiCategory = "Obese (Class II)";
  else
    this.state.assignedBmiCategory = "Obese (Class III)";

}

displayBmiAndAssignedCategory = () => {
  this.state.isBmiCalculated = true;
  this.forceUpdate();
}

clearCriterias = () => {
  this.state.isBmiCalculated = false;
  this.weightTextInputRef.current.clear();
  this.heightTextInputRef.current.clear();
  this.forceUpdate();
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20, 
    marginBottom: 40
  },
  footerText: {
    fontWeight: 'bold',
    color: '#2196F3',
    fontSize: 20, 
    margin: 20,
  },
  textInput: {
    minHeight: 40, 
    padding: 10, 
    minWidth: 300,
    margin: 10,
    borderWidth: 1,
  },
  basicButton: {
    margin: 5,
    padding: 10,
  },
  specialButton: {
    margin: 5,
    padding: 10,
  }
});

export default App;