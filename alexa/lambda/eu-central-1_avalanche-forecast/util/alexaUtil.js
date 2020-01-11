const Alexa = require('ask-sdk-core');

const SessionUtil = {
	clear(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		delete sessionAttributes.context;
		delete sessionAttributes.dangerscaleLevel;

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput;
	},
	getResolutedSlotValues(handlerInput) {
		let slots = handlerInput.requestEnvelope.request.intent.slots;
		let result = {};

		Object.keys(slots).forEach(function(key) {
		  	var slot = slots[key];
			let slotResult = {};
			slotResult.value = slot.value;

			if(slot.resolutions
				&& slot.resolutions.resolutionsPerAuthority
				&& slot.resolutions.resolutionsPerAuthority.length
				&& slot.resolutions.resolutionsPerAuthority[0].values
				&& slot.resolutions.resolutionsPerAuthority[0].values.length
				&& slot.resolutions.resolutionsPerAuthority[0].values[0].value) {
				slotResult.id = slot.resolutions.resolutionsPerAuthority[0].values[0].value.id
				slotResult.name = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name
			}

			result[slot.name] = slotResult;
		});

		return result;
	},
	getDisplay(response, template, imageUrl, title, text, subTitle) {
		const image = new Alexa.ImageHelper().addImageInstance(imageUrl).getImage();
		const richText = new Alexa.RichTextContentHelper()
		.withPrimaryText(subTitle)
		.withSecondaryText(text)
		.getTextContent();

		if (template == 'BodyTemplate7') {
			response.addRenderTemplateDirective({
				type: template,
				backButton: 'visible',
				backgroundImage: image,
				title: title,
				textContent: richText
			});	
		} else {
			response.addRenderTemplateDirective({
				type: template,
				backButton: 'visible',
				image: image,
				title: title,
				textContent: richText,
			});	
		}
		
		return response
	}
};

module.exports = SessionUtil;