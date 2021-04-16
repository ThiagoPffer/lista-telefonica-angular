angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];
    $scope.contato = {
        data: new Date()
    };

    var carregarContatos = function(){
        contatosAPI.getContatos().then(function(data) {
            $scope.contatos = data.data;
        }).catch(function(data){
            $scope.error = "Não foi possível carregar os dados: " + data.status;
        });
    };
    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().then(function(data) {
            $scope.operadoras = data.data;
        });
    };
    $scope.adicionarContato = function(contato){
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    }
    $scope.apagarContatos = function(contatos){
        contatos.filter(function(contato) {
            if(contato.selected){
                contatosAPI.deleteContato(contato).then(function(response){
                    console.log(response.data);
                });
                console.log(contato.id);
            };
        });
    }
    $scope.isContatoSelected = function(contatos){
        return contatos.some(function(contato){
            return contato.selected;
        });
    }
    $scope.ordernarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();
});