const express = require('express');
const bodyParser = require('body-parser');
const MLR = require("ml-regression-multivariate-linear");

const topPriceModel = require("./models/Top_Price_Prediction_Model.json");
// fetch("./models/Top_Price_Prediction_Model.json")
//   .then(response => response.json())
//   .then(data => {
//     // Handle the JSON data here
//     // console.log(data);
//     topPriceModel = data;
//   })
//   .catch(error => {
//     // Handle errors, if any
//     console.error('Error:', error);
//   });
const pantsPriceModel = require("./models/Pants_Price_Prediction_Model.json");
// fetch("./models/Pants_Price_Prediction_Model.json")
//   .then(response => response.json())
//   .then(data => {
//     // Handle the JSON data here
//     // console.log(data);
//     pantsPriceModel = data;
//   })
//   .catch(error => {
//     // Handle errors, if any
//     console.error('Error:', error);
//   });

  let shoePriceModel = require("./models/Shoe_Price_Prediction_Model.json");
//   fetch("./models/Shoe_Price_Prediction_Model.json")
//   .then(response => response.json())
//   .then(data => {
//     // Handle the JSON data here
//     // console.log(data);
//     shoePriceModel = data;
//   })
//   .catch(error => {
//     // Handle errors, if any
//     console.error('Error:', error);
//   });
  
const app = express();
const port = 5000;

app.use(bodyParser.json());

// Handle POST request to '/process-data'
app.post('/pridction-data', (req, res) => {
  const inputData = req.body;
  // Process inputData (perform any required logic)
  let itemType = req.body.type;
  let size = req.body.size;
  let condition = request.condition;
  let brand = request.brand;

  let predictedPrice;
  switch(itemType){
    case "top":
        predictedPrice = predictTopPrice([size,condition,brand]);
        break;
    case "pants":
        predictedPrice = predictPantsPrice([size,condition,brand]);
        break;
    default:
        predictedPrice = predictShoePrice([size,condition,brand]);
        break;
        
  }

  // Send a response back to the client
  res.json({ response: `You sent: ${predictedPrice}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//function that predictis the ptice of tops;
function predictTopPrice(topDetails){
    let topPrice = MLR.load(topPriceModel); //initialize the model

    let size = topDetails[0];
    let condition = parseInt(topDetails[1]);
    let brand = topDetails[2];
    featureRow = []; // creates a feature row that will be passed to the model to make a prediction

    switch(size){
        case "XS": //If size = XS
            featureRow.push(1); // XS =1
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "S": //If size = S
            featureRow.push(0); // XS =0
            featureRow.push(1); // S = 1
            featureRow.push(0); // M = 0
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "M": //If size=M
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(1); // M = 1
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;
        
        case "L": //If size=L
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(1); // L = 1
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "XL": //If size= XL
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L = 0
            featureRow.push(1); // XL = 1
            // featureRow.push(0); // Other = 0
            break;

        default: //If size = other
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L = 0
            featureRow.push(0); // XL = 0
            // featureRow.push(1); // Other = 1
            break;
    } //end of switch statment for handling the size value

    //there are five conditions, 1-5. they are treated as categorical data
    switch(condition){
        case 1: // if condition = 1
            featureRow.push(1); // condition 1 = 1
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 2: // if condition = 2
            featureRow.push(0); // condition 1 = 0
            featureRow.push(1); // condition 2 = 1
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 3: // if condition = 3
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(1); // condition 3 = 1
            featureRow.push(0); // condition 4 = 0
            break;

        case 4: // if condition = 4
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(1); // condition 4 = 1
            break;
        
        default: // if condition = 5
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;
    } // end of switch statment for handling the condition

    // Brands include: Adidas, converse, cotton-on, G-Star Raw, H&M, Nike, otherbrands
    switch(brand){
        case "Adidas": //if brand="Adidias"
            featureRow.push(1); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;
        
        case "converse": //if brand="converse"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(1); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;
        
        case "cotton-on": //if brand="cotton-on"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(1); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;

        case "G-Star Raw": //if brand="Adidias"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(1); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;
        
        case "H&M": //if brand="H&M"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(1); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;

        case "Nike": //if brand="Adidias"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(1); // brand = "Nike"
            break;
        
        default: // brand= "other"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            featureRow.push(0); // brand = "G-star Raw"
            featureRow.push(0); // brand = "H&M"
            featureRow.push(0); // brand = "Nike"
            break;
    }//end of switch stament for handling brand

    console.log("Top details to predict on: ", featureRow);
    let predictedTopPrice = topPrice.predict(featureRow); // get the predicted price
    console.log("Predicted Price: R", predictedTopPrice[0]);
    return predictedTopPrice;

} //end of function to predict the price of tops

//function to predict the price of pants
function predictPantsPrice(pantsDetails){
    let pantsPrice = MLR.load(pantsPriceModel); //initialize the model

    let size = pantsDetails[0];
    let condition = pantsDetails[1];
    let brand = pantsDetails[2];
    featureRow = [];

    switch(size){
        case "xs": //If size = XS
            featureRow.push(1); // XS =1
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "s": //If size = S
            featureRow.push(0); // XS =0
            featureRow.push(1); // S = 1
            featureRow.push(0); // M = 0
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "m": //If size=M
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(1); // M = 1
            featureRow.push(0); // L =0
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;
        
        case "l": //If size=L
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(1); // L = 1
            featureRow.push(0); // XL =0
            // featureRow.push(0); // Other = 0
            break;

        case "xl": //If size= XL
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L = 0
            featureRow.push(1); // XL = 1
            // featureRow.push(0); // Other = 0
            break;

        default: //If size = other
            featureRow.push(0); // XS =0
            featureRow.push(0); // S = 0
            featureRow.push(0); // M = 0
            featureRow.push(0); // L = 0
            featureRow.push(0); // XL = 0
            // featureRow.push(1); // Other = 1
            break;
    } //end of switch statment for handling the size value

    //there are five conditions, 1-5. they are treated as categorical data
    switch(condition){
        case 1: // if condition = 1
            featureRow.push(1); // condition 1 = 1
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 2: // if condition = 2
            featureRow.push(0); // condition 1 = 0
            featureRow.push(1); // condition 2 = 1
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 3: // if condition = 3
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(1); // condition 3 = 1
            featureRow.push(0); // condition 4 = 0
            break;

        case 4: // if condition = 4
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(1); // condition 4 = 1
            break;
        
        default: // if condition = 5
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;
    } // end of switch statment for handling the condition

    // Brands include: LEVI, NIKE, FOG, G-Star Raw, H&M, Nike, otherbrands
    switch(brand){
        case "levi": //if brand="Levi"
            featureRow.push(1); // brand = "Levi"
            featureRow.push(0); // brand = "Nike"
            featureRow.push(0); // brand = "Fog"
            // featureRow.push(0); // brand = "G-star Raw"
            // featureRow.push(0); // brand = "H&M"
            // featureRow.push(0); // brand = "Nike"
            break;
        
        case "nike": //if brand="NIKE"
            featureRow.push(0); // brand = "Levi"
            featureRow.push(1); // brand = "Nike"
            featureRow.push(0); // brand = "Fog"
            // featureRow.push(0); // brand = "G-star Raw"
            // featureRow.push(0); // brand = "H&M"
            // featureRow.push(0); // brand = "Nike"
            break;
        
        case "fog": //if brand="cotton-on"
            featureRow.push(0); // brand = "Levi"
            featureRow.push(0); // brand = "Nike"
            featureRow.push(1); // brand = "fog"
            // featureRow.push(0); // brand = "G-star Raw"
            // featureRow.push(0); // brand = "H&M"
            // featureRow.push(0); // brand = "Nike"
            break;
        
        default: // brand= "other"
            featureRow.push(0); // brand = "Adidas"
            featureRow.push(0); // brand = "converse"
            featureRow.push(0); // brand = "cotton-on"
            // featureRow.push(0); // brand = "G-star Raw"
            // featureRow.push(0); // brand = "H&M"
            // featureRow.push(0); // brand = "Nike"
            break;
    }//end of switch statement for handling brand
    
    console.log("Pants details to predict on: ", featureRow);
    let predictedPantsPrice = pantsPrice.predict(featureRow); // get the predicted price
    console.log("Predicted Price: R", predictedPantsPrice[0]);
    return predictedPantsPrice;
}//end of function to predict the price of pants

//function to predict the price of shoes
function predictShoePrice(shoesDetails){
    let shoePrice = MLR.load(shoePriceModel); //initialize the model

    let size = shoesDetails[0];
    let condition = parseInt(shoesDetails[1]);
    let brand = shoesDetails[2];
    let featureRow  = [];

    featureRow.push(size);
    switch(condition){
        case 1: // if condition = 1
            featureRow.push(1); // condition 1 = 1
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 2: // if condition = 2
            featureRow.push(0); // condition 1 = 0
            featureRow.push(1); // condition 2 = 1
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;

        case 3: // if condition = 3
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(1); // condition 3 = 1
            featureRow.push(0); // condition 4 = 0
            break;

        case 4: // if condition = 4
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(1); // condition 4 = 1
            break;
        
        default: // if condition = 5
            featureRow.push(0); // condition 1 = 0
            featureRow.push(0); // condition 2 = 0
            featureRow.push(0); // condition 3 = 0
            featureRow.push(0); // condition 4 = 0
            break;
    } // end of switch statment for handling the condition

    // Brands include: Adidas, Converse, Nike, Jordans, Puma, Reebok, otherbrands
    switch(brand){
        case "Adidas": //if brand="Adidias"
            featureRow.push(1); // brand = "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(0); // brand != "Jordan"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;
        
        case "Converse": //if brand="converse"
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(1); // brand = "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(0); // brand != "Jordan"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;
        
        case "Nike": //if brand="cotton-on"
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(1); // brand = "Nike"
            featureRow.push(0); // brand != "Jordans"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;

        case "Jordans": //if brand="Jordan"
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(1); // brand = "Jordans"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;
        
        case "Puma": //if brand="Puma"
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(0); // brand != "Jordans"
            featureRow.push(1); // brand = "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;

        case "Reebok": //if brand="Reebok"
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(0); // brand != "Jordans"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(1); // brand = "Reebok"
            break;
        
        default: // brand= "other" represent anyother shoe brand
            featureRow.push(0); // brand != "Adidas"
            featureRow.push(0); // brand != "converse"
            featureRow.push(0); // brand != "Nike"
            featureRow.push(0); // brand != "Jordans"
            featureRow.push(0); // brand != "Puma"
            featureRow.push(0); // brand != "Reebok"
            break;
    }//end of switch stament for handling brand

    console.log("Shoe details to predict on: ", featureRow);
    let predictedShoePrice = shoePrice.predict(featureRow); // get the predicted price
    console.log("Predicted Price: R", predictedShoePrice[0]);
    return predictedShoePrice;

}//end of function to predict the price of shoes
