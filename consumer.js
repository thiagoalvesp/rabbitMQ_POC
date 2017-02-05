var amqp = require('amqplib');

//Conectando com o rabbitmq

amqp.connect('amqp://localhost')
	.then(function(conn){
		console.log('Conexão Ok');
		
		
		return conn.createChannel();
		
	}).then(function(ch){
		
		console.log('Canal Ok');
		
		//Uma mensagem sera consumida por vez
		ch.prefetch(1);
		
		ch.consume('mensagens', function(msg){
			
			
			console.log('%s Mensagem recebida: %s', new Date(), msg.content.toString());
			
			//diz a rabbit que a mensagem foi consumida com sucesso.
			//Contra ch.nack(msg);
			ch.ack(msg);
			
		});
		
		
	}).catch(console.warn);