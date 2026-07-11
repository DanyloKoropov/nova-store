function getDigits(value) {
    return value.replace(/\D/g, "");
}

function isValidExpirationDate(value) {
    const match = value.match(/^(\d{2})\/(\d{2})$/);

    if (!match) {
        return false;
    }

    const month = Number(match[1]);
    const year = Number(`20${match[2]}`);

    if (month < 1 || month > 12) {
        return false;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear) {
        return false;
    }

    if (year === currentYear && month < currentMonth) {
        return false;
    }

    return true;
}

export function validateCheckoutForm(formData) {
    const errors = {};

    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
        errors.email = "Enter a valid email address.";
    }

    const phoneDigits = getDigits(formData.phone);

    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (phoneDigits.length < 10) {
        errors.phone = "Enter a valid phone number.";
    }

    if (!formData.address.trim()) {
        errors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
        errors.city = "City is required.";
    }

    if (!formData.state.trim()) {
        errors.state = "State is required.";
    } else if (!/^[a-zA-Z]{2}$/.test(formData.state.trim())) {
        errors.state = "Use a 2-letter state code.";
    }

    if (!formData.zipCode.trim()) {
        errors.zipCode = "ZIP code is required.";
    } else if (
        !/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())
    ) {
        errors.zipCode = "Enter a valid ZIP code.";
    }

    if (!formData.cardholderName.trim()) {
        errors.cardholderName = "Cardholder name is required.";
    }

    const cardDigits = getDigits(formData.cardNumber);

    if (!formData.cardNumber.trim()) {
        errors.cardNumber = "Card number is required.";
    } else if (cardDigits.length !== 16) {
        errors.cardNumber = "Card number must contain 16 digits.";
    }

    if (!formData.expirationDate.trim()) {
        errors.expirationDate = "Expiration date is required.";
    } else if (!isValidExpirationDate(formData.expirationDate)) {
        errors.expirationDate =
            "Enter a valid future date in MM/YY format.";
    }

    if (!formData.cvv.trim()) {
        errors.cvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = "CVV must contain 3 or 4 digits.";
    }

    return errors;
}
