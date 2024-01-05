
/**include the following link at the botton of the
 * sell page in a script tag:
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
 * 
 * ** */

//1st load the model when the page loads:
let imgCassifierModel;
let modelLoaded = false;
$(document).ready(async function(){
    modelLoaded = false;
    console.log("Loading image classifier model.")
    imgCassifierModel =await tf.loadLayersModel("./models/model.json");
    console.log("Image Classifier Model Loaded.");
    modelLoaded = true;

});//end of document.ready



// the #img-input is the  id for the input element 
let imageLoaded = false;
$('#imgInput').change(async function(){
    console.log("Change event");
    //first displayes the images that the user uploaded.
    const imgOutput = document.getElementById("imgDisplay");
    imgOutput.src = URL.createObjectURL(event.target.files[0]);
    
    let image = $("#imgDisplay").get(0); //gets the image loaded

    //before we can run the image through the model, it needs to be prepossed
    console.log("Loading Image:")
    let tensor = tf.browser.fromPixels(image, 3)
        .resizeNearestNeighbor([224,224])
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();

    console.log("Image loaded. Making prediction.");

    //now we can make prediction on the image
    let predictions = await imgCassifierModel.predict(tensor).data();
    console.log(predictions);
    let results = Array.from(predictions)
        .map(function (prob, i){
            return{
                probability: prob,
                className: TARGET_CLASSES[i]

            };
        });
        // ).sort(function (a,b){
        //     return b.probability - a.probability;

        // }).slice(0,2);
        
        // console.log("Results:", results);
        $("#prediction-list").empty();
        results.forEach(function(prob){
            // $("#prediction-list").append(`<li>${prob.className}: ${prob.probability.toFixed(3)}</li>`);
            $("#prediction-list").append(`<li> Valid Clothing item</>`)
        });
});//end of onChange method;







