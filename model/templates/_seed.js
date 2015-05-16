{<%_(fields).forEach(function (definition, field){
	if(_.keys(fields).indexOf(field) < _.size(fields) - 1){%>
	<% if(definition.type === 'String'){%>		<%= field %>: faker.internet.email(),<%}%>
	<% if(definition.type === 'Date'){%>		<%= field %>: new Date(),<%}%>
	<% if(definition.type === 'Number'){%>		<%= field %>: faker.random.number({ min:0}),<%}%>
	<% if(definition.type === 'Boolean'){%>		<%= field %>: true,<%}%>
	<%}else{%>
	<% if(definition.type === 'String'){%>		<%= field %>: faker.internet.email()<%}%>
	<% if(definition.type === 'Date'){%>		<%= field %>: new Date()<%}%>
	<% if(definition.type === 'Number'){%>		<%= field %>: faker.random.number({ min:0})<%}%>
	<% if(definition.type === 'Boolean'){%>		<%= field %>: true<%}%>
	<%}%>
<%});%>		}