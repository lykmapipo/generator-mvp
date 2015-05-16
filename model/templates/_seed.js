{<%_(seedFields).forEach(function (definition, field){
	if(_.keys(seedFields).indexOf(field) < _.size(seedFields) - 1){%>
	<%if(definition.type === 'String'){%>		<%= field %>: faker.lorem.words(1)[0],<%}
	if(definition.type === 'Date'){%>		<%= field %>: faker.date.past(4),<%}
	if(definition.type === 'Number'){%>		<%= field %>: faker.random.number({ min:0}),<%}
	if(definition.type === 'Boolean'){%>		<%= field %>: true,<%}
	if(definition.type === 'Array'){%>		<%= field %>: [{}],<%}
	if(definition.type === 'Mixed'){%>		<%= field %>: {},<%}
	}else{%>
	<%if(definition.type === 'Date'){%>		<%= field %>: faker.date.past(4)<%}
	if(definition.type === 'Number'){%>		<%= field %>: faker.random.number({ min:0})<%}
	if(definition.type === 'Boolean'){%>		<%= field %>: true<%}
	if(definition.type === 'Array'){%>		<%= field %>: []<%}
	if(definition.type === 'Mixed'){%>		<%= field %>: []<%}
	}
});%>
		}