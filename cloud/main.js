
Parse.Cloud.define('hello', function (req, res) {
  res.success('Hi');
});

Parse.Cloud.define('getNumberOfScheduledMessagesThisYear', function (req, res) {
	var smQuery = new Parse.Query("ScheduledMessage");

	
	if (req.user.get("subscriptionDate") != null) {
		var subDate = req.user.get("subscriptionDate");
		var maxDate = subDate;
		maxDate.setYear(subDate.getMonth() + 12);
		smQuery.greaterThanOrEqualTo("createdAt", subDate);
		smQuery.lessThanOrEqualTo("createdAt", maxDate);
	}

	return smQuery.find().then(function (scheduledMessages) {
		return res.success(scheduledMessages.length());
	}, function (error) {
		return res.error(error);
	});
});