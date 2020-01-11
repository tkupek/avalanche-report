const SessionUtil = {
	clear(handlerInput) {
		const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
		delete sessionAttributes.context;
		delete sessionAttributes.dangerscaleLevel;

        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput;
	}
};

module.exports = SessionUtil;