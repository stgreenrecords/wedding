use(function () {
    var result;
    var contact = this.contact;
    var contactJson = JSON.parse(contact);
    switch(contactJson.typeSelection) {
        case 'phone':
            result = "/content/dam/wedding/components/social/phone.png";
            break;
        case 'email':
            result = "/content/dam/wedding/components/social/email.png";
            break;
        case 'website':
            result = "/content/dam/wedding/components/social/website.png";
            break;
        case 'vk':
            result = "/content/dam/wedding/components/social/vk.png";
            break;
        case 'facebook':
            result = "/content/dam/wedding/components/social/facebook.png";
            break;
        case 'instagram':
            result = "/content/dam/wedding/components/social/instagram.png";
            break;
        default:
            result = "";
    }

    return {
        'imagePath': result,
        'contactValue' : contactJson.value

    };
});

