/* global xml2json:true */
/* global purchaseOrder:true */
/* global window:true */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageToast","zhet0010/libs/conv","zhet0010/libs/api"], function(Controller,MessageToast,conv,api) {
	"use strict";
	var fileText = "";
	var jsonData = "";
	var CCController = Controller.extend("zhet0010.controller.View1", {

		uploadFileToHanaDBTest : function(oEvent) {
		    var oFileUploader = this.getView().byId("fileUploader");
		    var sFile = oFileUploader.getValue();
		    if (sFile === "") {
							var msg = "Please select file.";
							MessageToast.show(msg);
							return;
		    }
		    //oFileUploader.destroyHeaderParameters();
		    //sap.ui.getCore().getModel("modelName").refreshSecurityToken();  
		    //oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "x-csrf-token", value: this.getModel("modelName").getHeaders()['x-csrf-token'] }));
		    //oFileUploader.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: oFileUploader.getValue() }));
		    oFileUploader.upload();
		    
		    var file = oEvent.getParameters("files")[0];
		    //var file = oFileUploader.files[0];
		    //var file2 = jQuery.sap.domById("fileUploader").files[0];
		    MessageToast.show(file);
		},
		changeFile: function(oEvent){
			var file = oEvent.getParameters().files[0];
			
			if(file !== undefined && window.FileReader){
				var reader = new FileReader();
	            reader.readAsText(file,"UTF-8");

	            reader.onload = function(evn) {  
					fileText = evn.target.result;
					
					fileText = fileText.replace(/<\?xml.*\?>/, '');
                    var parser = new DOMParser();
					var xml = parser.parseFromString(fileText, "text/xml");
                    jsonData = JSON.stringify(xml2json(xml));
                    
                    MessageToast.show(jsonData);
			    };
			} else {
				MessageToast.show("Please select file.");
			}
		},
		uploadFileToHanaDB: function(oEvent) {
				var oFileUploader = this.getView().byId("fileUploader");
				var fileName = oFileUploader.getValue();

				if(fileName === ""){
					var msg = "Please select file.";
					MessageToast.show(msg);
					return;
				} else {
					/*
					oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
					        name: "slug",
					        value: oFileUploader.getValue()
					    }));

				    oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
				        name: "x-csrf-token",
				        value: this.oModel.getSecurityToken()
				    })); */
 
					//oFileUploader.setSendXHR(true);
					oFileUploader.upload();
				}

		},
		uploadFileToHanaDBComplete: function(oEvent) {
			//var url = "https://fg7cba8390ea.ap1.hana.ondemand.com/ZA201715/insert.xsjs";
			var url = "../ZA201715/insert.xsjs";
			var data = {
				"PO_DATA":jsonData
			};
			
			$.ajax({
				type: "POST",
    			url : url,
    			data : data,
    			cache : false,
    			dataType: "json",
    			//dataType: "jsonp",
    			//jsonp: "jsonp_callback",
    			xhrFields: {
    				withCredentials: true
    			},
    			crossDomain: true,
    			beforeSend: function(xhr) {
    				//xhr.withCredentials = true;
					//xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        		},
    			success : function(response) {
    				/*
    				var token = response.getResponseHeader("X-CSRF-Token");
	
    				$.ajax({
	                    url: url,
	                    type: "POST",
	                    data: JSON.stringify(data),
	                    beforeSend: function(xhr) {
	                        xhr.setRequestHeader("X-CSRF-Token", token);
	                    },
	                    success : function(res) {
	                    	var msg = JSON.stringify(res);
							MessageToast.show(msg);
	                     },
	                     error : function(e) {
	                        var errMsg = e.responseText;
							MessageToast.show(errMsg);
	                     }
                	});
                	*/

    				var msg = JSON.stringify(response);
					MessageToast.show("success:" + msg);
    			},
    			error : function(e) {
    				var msg = e.status;
					MessageToast.show("error:" + msg);
    			}
			});
			
			
			
				//var status = oEvent.getParameters().status;
				//MessageToast.show("status:" + status);
      
    			/*
				var sResponse = oEvent.getParameters().response;
				if (sResponse) {
					var sMsg = "";
					var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
					if (m[1] === "200") {
						sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
						oEvent.getSource().setValue("");
					} else {
						sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
					}
	
					MessageToast.show(sMsg);
				}
				*/
		},
		registLatestData: function(oEvent) {
			// 最新の登録データを取得する
			
			var url = "../ZA201715/select.xsjs";
			
			$.ajax({
				type: "GET",
    			url : url,
    			cache : false,
    			dataType: "json",
    			xhrFields: {
    				withCredentials: true
    			},
    			crossDomain: true,
    			beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        		},
    			success : function(response) {
    				var msg = purchaseOrder(response);		// APIにリクエスト
					MessageToast.show("success:" + msg);
    			},
    			error : function(e) {
    				var msg = e.status;
					MessageToast.show("error:" + msg);
    			}
			});
		}
	});
	
	return CCController;
});