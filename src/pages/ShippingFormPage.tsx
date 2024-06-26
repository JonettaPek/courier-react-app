import { FormEvent, useState } from "react"
import { ShipFromForm } from "../components/order-form/ShipFromForm"
import { ShipToForm } from "../components/order-form/ShipToForm"
import { ParcelInformationForm } from "../components/order-form/ParcelInformationForm"
//import { ShippingServiceForm } from "../components/order-form/ShippingServiceForm"
//import { PaymentForm } from "../components/order-form/PaymentForm"
import { useMultistepForm } from "../utilities/hooks/useMultistepForm"
import { FormData } from "../utilities/type-aliases/order-form/FormData"
import { ParcelType } from "../utilities/enums/ParcelType"

const INITIAL_DATA: FormData = {
	fromCompanyName: "",
	fromAddress: "",
	fromFullName: "",
	fromEmail: "",
	fromPhone: "",
	toCompanyName: "",
	toAddress: "",
	toFullName: "",
	toEmail: "",
	toPhone: "",
	parcelType: ParcelType.Custom,
	length: "",
	width: "",
	height: "",
	weight: "",
	parcelDescription: ""
	/*nameOnCard: "",
	cardNumber: "",
	expiryDate: "",
	securityCode: "",*/
}

export function ShippingFormPage() {
	const [data, setData] = useState(INITIAL_DATA)

	function updateFields(fields: Partial<FormData>) {
		setData( prev => {
			return { ...prev, ...fields }
		})
	}

	const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back } = useMultistepForm([
		<ShipFromForm {...data} updateFields={updateFields} />,
		<ShipToForm {...data} updateFields={updateFields} />,
		<ParcelInformationForm {...data} updateFields={updateFields} />,
		//<ShippingServiceForm />,
		//<PaymentForm {...data} updateFields={updateFields} />
	])

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (!isLastStep) {
			return next()
		} else {
			fetch(
				"http://localhost:8081/orders/create-order", 
				{
					method: "POST",
					headers: { 
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data)
				})
			.then(response => response.json())
			.then(data => console.log("created order successfully", data))
			.catch(error => console.error("error creating order", error))
		}
	}	

	return (
		<>
			<div style={{
			position: "relative",
			background: "white",
			border: "1px solid black",
			padding: "2rem",
			margin: "1rem",
			borderRadius: "0.5rem",
			fontFamily: "Arial",
			maxWidth: "max-content"
			}}>
				<form onSubmit={handleSubmit}>
					<div style={{
					position: "absolute",
					top: "0.5rem",
					right: "0.5rem"
					}}>
					{currentStepIndex + 1} / {steps.length}
					</div>
					{step}
					<div style={{
					marginTop: "1rem",
					display: "flex",
					gap: "0.5rem",
					justifyContent: "flex-end"
					}}>
					{!isFirstStep && (
						<button type="button" onClick={back} className="border-2 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-gray-500 hover:border-slate-300">
						Back
						</button>
					)}
					<button type="submit" className="border-2 px-2 py-1 rounded-md hover:bg-slate-300 hover:text-gray-500 hover:border-slate-300">
						{isLastStep ? "Finish" : "Next"}
					</button>
					</div>
				</form>
			</div>
		</>
	)
}