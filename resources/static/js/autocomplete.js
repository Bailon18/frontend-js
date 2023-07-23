$(document).ready(() => {
	$("#categoria").autocomplete({
		source: (request, response) => {
			$.ajax({
				url: "/categoria/cargar-productos/" + request.term,
				dataType: "json",
				data: {
					term: request.term
				},
				success: (data) => {
					response($.map(data, (element) => {
						return {
							value: element.id_Categoria,
							label: element.descripcion,
							
						};
					}));
				},
			});
		},
	});
	
	$("form").submit(function(){
		$("#productosPlantilla").remove();
		return;
	});
});

function existeCategoria(id_Categoria) {
	let existe = false;
	$("input[descripcion='id_Categoria[]']").each(function() {
		if(id == $(this).val()){
			existe = true;
		}
	});
	return existe;
}


