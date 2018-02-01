/*eslint-disable no-console, no-alert */
/* global push:true */
function purchaseOrder(response){
	var result = "";
	var data = JSON.stringify(response);
	var obj = JSON.parse(data);
	//var sbj = obj.d;
	var sbj = obj["d"];
	//var sbj = obj;

	var postData = JSON.stringify(sbj);	

	
	//Create OData Model with service URL
	//API Key for API Sandbox

	
	var oModel = new sap.ui.model.odata.v2.ODataModel(
						"../sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV"
);
/*
	var oModel = new sap.ui.model.odata.v2.ODataModel(
						"/s4hanacloud/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV",
						{headers : {"6mGifbdR17HVs7j80bkCAwkAEXZgQoCk":""}}); */
						
	//oModel.setUseBatch(false);			// for sandbox GET method
	oModel.setUseBatch(false);

	//oModel.setHeaders({"Content-Type":"application/json","Accept":"application/json","APIKey":"6mGifbdR17HVs7j80bkCAwkAEXZgQoCk"});		// for sandbox GET method
	oModel.setHeaders({"Content-Type":"application/json; charset=utf-8","Accept":"application/json; charset=utf-8"});
	
	//sending request
	//API endpoint for API sandbox 
	var oData = [];
	/*
	oData["url"] = "../sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder";
	oData["method"] = "POST";
	oData["request"] = postData;
	
	var rh = [];
	rh["DataServiceVersion"] = "2.0";
	rh["Content-Type"] = "application/json";
	rh["Accept"] = "application/json";
	rh["Authorization"] = "Basic UzAwMTg0Njc5NTU6N0tdRFl+N1A=";
	
	oData["toRequestHeaders"] = rh;
	*/
	//oData["A_PurchaseOrderType"] = postData;
	//oData = '{"d":' + postData + '}';

//	oData = '{"d":{';
//	oData += '"__metadata":' + postData;
//	oData += '}}';


	var testData = {
  "PurchaseOrder": "",
  "PurchasingOrganization": "A110",
  "PurchasingGroup": "A00",
  "CompanyCode": "A000",
  "SupplyingSupplier": "A110",
  "Supplier": "A110",
  "DocumentCurrency": "JPY",
  "PurchaseOrderDate": "2018-01-31T00:00:00",
  "ValidityStartDate": "2018-01-31T00:00:00",
  "ValidityEndDate": "2018-02-28T00:00:00",
  "PurchaseOrderType": "NB",
  "CreationDate": "2018-01-30T00:00:00",
  "to_PurchaseOrderItem": {
    "results": [
      {
        "PurchaseOrder": "",
        "OrderQuantity": "9",
        "PurchaseOrderQuantityUnit": "PC",
        "OrderPriceUnit": "PC",
        "NetPriceAmount": "100",
        "NetPriceQuantity": "9",
        "PurchaseOrderItem": "10",
        "PurchaseOrderItemCategory": "0",
        "Material": "TG11",
        "PurchaseOrderItemText": "test6",
        "Plant": "A110",
        "to_AccountAssignment": {
          "results": [
            {
              "PurchaseOrder": "",
              "PurchaseOrderItem": "10",
              "AccountAssignmentNumber": "1",
              "SettlementReferenceDate": "2018-01-31T00:00:00",
              "PurgDocNetAmount": "100"
            }
          ]
        },
        "to_PurchaseOrderPricingElement": {
          "results": [
            {
              "PurchaseOrder": "",
              "ConditionQuantity": "9",
              "ConditionQuantityUnit": "PC",
              "PurchaseOrderItem": "10"
            }
          ]
        }
      },
      {
        "PurchaseOrder": "",
        "OrderQuantity": "9",
        "PurchaseOrderQuantityUnit": "PC",
        "OrderPriceUnit": "PC",
        "NetPriceAmount": "100",
        "NetPriceQuantity": "9",
        "PurchaseOrderItem": "20",
        "PurchaseOrderItemCategory": "0",
        "Material": "TG11_2",
        "PurchaseOrderItemText": "test6",
        "Plant": "A110",
        "to_AccountAssignment": {
          "results": [
            {
              "PurchaseOrder": "",
              "PurchaseOrderItem": "20",
              "AccountAssignmentNumber": "1",
              "SettlementReferenceDate": "2018-01-31T00:00:00",
              "PurgDocNetAmount": "100"
            }
          ]
        },
        "to_PurchaseOrderPricingElement": {
          "results": [
            {
              "PurchaseOrder": "",
              "ConditionQuantity": "9",
              "ConditionQuantityUnit": "PC",
              "PurchaseOrderItem": "20"
            }
          ]
        }
      }
    ]
  }
};





	//console.log("----- testData -----");
	//console.log(testData);
	console.log("----- postData -----");
	console.log(postData);
	console.log(JSON.parse(postData));

	
	oData = JSON.parse(postData);
	//oData = testData;
	
	oModel.create("/A_PurchaseOrder", oData, [], true,
		function(d,res){
			console.log("data:" + d);
		},
		function(error){
			console.log("error:" + error);
		}
	);  // for POST

	
	oModel.attachMetadataFailed(function(arg){
		var res = arg.getParameters();
		
		console.log("attachMetadataFailed:" + res.message);
		console.log("status:" + res.statusCode);
		console.log("responseTxt:" + res.responseTxt);
		
	});
	oModel.attachRequestCompleted(function(oEvent){
	    var oData = oEvent.getSource().oData;
	    sap.m.MessageToast.show(JSON.stringify(oData));
	    console.log(oData);
	});
			
	return result;
}