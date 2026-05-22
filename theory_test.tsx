let userName: string = "Alex"
let daysRemaining: number = 18
// This happens because the type is set to Number, but the variable is a string
let isNotifactionSent: boolean = false
interface Receiver {
    id: number
    fullName: string
    daysUntilBirthday: number
}
function calculateAlertDays(daysUntilBirthday: number): number {
    return daysUntilBirthday - daysRemaining
}

function GiftCard() {
    return (
        <>
            <h1>Headphones</h1>
            <p>These are headphones</p>
        </>
    );
}
