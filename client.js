var amqp = require('amqplib');

//Conectando com o rabbitmq

amqp.connect('amqp://localhost')
	.then(function(conn){
		
		console.log('Conexão Ok');
		
		
		return conn.createChannel();
		
	}).then(function(ch){
		
		console.log('Canal Ok');
		
		
		setInterval(function(){
			console.log('Enviando Mensagem as %s',new Date());
			ch.sendToQueue('mensagens', 
				new Buffer('Hello Word'),
				{contentType:'application/json'}
			);
		},1000);
		
		
		
	}).catch(console.warn);