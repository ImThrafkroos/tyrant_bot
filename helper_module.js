
class HelperModule {

	static clean(t) {
		if (typeof(t) === "string") {
			return t.replace(/`/g, "`" + String.fromCharCode(8203).replace(/@/g, "@" + String.fromCharCode(8203)));
		}
		else {
			return t;
		}
	}

	static parseMentions(mentions) {

		var object = { members : [], channels : [], roles : [] };
		
		mentions.forEach((mention) => {

			var match;

			if ((match = /<@(\d+)>/.exec(mention))) object.members.push(match[1]);
			if ((match = /<#(\d+)>/.exec(mention))) object.channels.push(match[1]);
			if ((match = /<@&(\d+)>/.exec(mention))) object.roles.push(match[1]);

		});

		return object;
		
	}
	
}

module.exports = HelperModule;