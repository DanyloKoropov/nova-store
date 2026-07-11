function FormField({
    label,
    name,
    value,
    error,
    onChange,
    ...inputProps
}) {
    const errorId = `${name}-error`;

    return (
        <div className="checkout-field">
            <label htmlFor={name}>{label}</label>

            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={error ? "input-error" : ""}
                {...inputProps}
            />

            {error && (
                <p id={errorId} className="field-error">
                    {error}
                </p>
            )}
        </div>
    );
}

export default function CheckoutForm({
    formData,
    errors,
    onChange,
    onSubmit,
}) {
    return (
        <form
            className="checkout-form"
            onSubmit={onSubmit}
            noValidate
        >
            <section className="checkout-form-section">
                <div className="checkout-section-header">
                    <p>Step 1</p>
                    <h2>Contact Information</h2>
                </div>

                <div className="checkout-fields-grid">
                    <FormField
                        label="First name"
                        name="firstName"
                        value={formData.firstName}
                        error={errors.firstName}
                        onChange={onChange}
                        type="text"
                        autoComplete="given-name"
                    />

                    <FormField
                        label="Last name"
                        name="lastName"
                        value={formData.lastName}
                        error={errors.lastName}
                        onChange={onChange}
                        type="text"
                        autoComplete="family-name"
                    />

                    <FormField
                        label="Email"
                        name="email"
                        value={formData.email}
                        error={errors.email}
                        onChange={onChange}
                        type="email"
                        autoComplete="email"
                    />

                    <FormField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        error={errors.phone}
                        onChange={onChange}
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 555-5555"
                    />
                </div>
            </section>

            <section className="checkout-form-section">
                <div className="checkout-section-header">
                    <p>Step 2</p>
                    <h2>Shipping Address</h2>
                </div>

                <div className="checkout-fields-grid">
                    <div className="checkout-field-full">
                        <FormField
                            label="Address"
                            name="address"
                            value={formData.address}
                            error={errors.address}
                            onChange={onChange}
                            type="text"
                            autoComplete="street-address"
                        />
                    </div>

                    <FormField
                        label="City"
                        name="city"
                        value={formData.city}
                        error={errors.city}
                        onChange={onChange}
                        type="text"
                        autoComplete="address-level2"
                    />

                    <FormField
                        label="State"
                        name="state"
                        value={formData.state}
                        error={errors.state}
                        onChange={onChange}
                        type="text"
                        autoComplete="address-level1"
                        placeholder="IL"
                        maxLength="2"
                    />

                    <FormField
                        label="ZIP code"
                        name="zipCode"
                        value={formData.zipCode}
                        error={errors.zipCode}
                        onChange={onChange}
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="60067"
                    />
                </div>
            </section>

            <section className="checkout-form-section">
                <div className="checkout-section-header">
                    <p>Step 3</p>
                    <h2>Payment Details</h2>
                </div>

                <div className="checkout-fields-grid">
                    <div className="checkout-field-full">
                        <FormField
                            label="Cardholder name"
                            name="cardholderName"
                            value={formData.cardholderName}
                            error={errors.cardholderName}
                            onChange={onChange}
                            type="text"
                            autoComplete="cc-name"
                        />
                    </div>

                    <div className="checkout-field-full">
                        <FormField
                            label="Card number"
                            name="cardNumber"
                            value={formData.cardNumber}
                            error={errors.cardNumber}
                            onChange={onChange}
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                        />
                    </div>

                    <FormField
                        label="Expiration date"
                        name="expirationDate"
                        value={formData.expirationDate}
                        error={errors.expirationDate}
                        onChange={onChange}
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        maxLength="5"
                    />

                    <FormField
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        error={errors.cvv}
                        onChange={onChange}
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        maxLength="4"
                    />
                </div>
            </section>

            <button
                type="submit"
                className="place-order-button"
            >
                Place Order
            </button>
        </form>
    );
}
