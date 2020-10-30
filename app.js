
var Api = "http://localhost:3000/user";
var maxPages = 0;
var count = 0;


fetch(Api)
  .then(response => response.json())
  .then(data => {

	var state = {
		'querySet': data,
		'page': 1,
		'rows': 4,
	}

	buildTable();


	function pagination(querySet, page, rows) {

		var trimStart = (page - 1) * rows
		var trimEnd = trimStart + rows

		var trimmedData = querySet.slice(trimStart, trimEnd)

		var pages = Math.ceil(querySet.length / rows);
		
		maxPages = pages;

		return {
			'querySet': trimmedData,
			'pages': pages,
			
		}
	}
	
	var nextBtn = document.getElementById("nextBtn");
	nextBtn.onclick = function next(){
		count++;
		
		if(count != maxPages){
			var table = document.getElementById("table-body").innerHTML = "";
		
			if(state.page < maxPages){
				
				state.page = state.page+1
				
				buildTable()
			};
			
		}else{
			document.getElementById("nextBtn").disabled = true;
		}
	}

	function buildTable() {
		var table = $('#table-body')

		var data = pagination(state.querySet, state.page, state.rows)

		var myList = data.querySet
		
		for (var i = 1 in myList) {
			//Keep in mind we are using "Template Litterals to create rows"
			var row = `<tr>
					  <td>${myList[i].rank}</td>
					  <td>${myList[i].first_name}</td>
					  <td>${myList[i].last_name}</td>
					  `
			table.append(row)
		}
	}
});
	

