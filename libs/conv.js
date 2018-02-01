// Convert XML to JSON
function xml2json(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

		if(nodeName === 'results'){					// add 20180130 start ----
			if(obj[nodeName]){
				obj[nodeName].push(xml2json(item));
			} else {
				obj[nodeName] = [];
				obj[nodeName].push(xml2json(item));
			}
		} else {									// add 20180130 end ------
	        if (typeof (obj[nodeName]) === "undefined") {
	          obj[nodeName] = xml2json(item);
	        } else {
	          if (typeof (obj[nodeName].push) === "undefined") {
	            var old = obj[nodeName];
	
	            obj[nodeName] = [];
	            obj[nodeName].push(old);
	          }
	          obj[nodeName].push(xml2json(item));
	        }
		}		// add 20180130 
      }
    } else {
    		obj = xml.textContent;
    }
    return obj;
  } catch (e) {
     
  }
}