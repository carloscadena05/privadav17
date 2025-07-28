import { FormControl } from "@angular/forms"
import { Pagination } from "./pagination.interface"

export class Donation {
    "id": string
    "accountId": string
    "amount": number
    "purpose": any
    "campaign": {
        "id": string
        "name": string
        "status": any
    }
    "fund": any
    "timestamps": {
        "createdBy": string
        "createdDateTime": string
        "lastModifiedBy": string
        "lastModifiedDateTime": string
    }
    "fundraiserAccountId": any
    "donorName": string
    "date": string
    "anonymousType": string
    "source": any
    "solicitationMethod": any
    "acknowledgee": any
    "tribute": any
    "donationCustomFields": any
    "solicitor": any
    "batchNumber": any
    "sendAcknowledgeEmail": boolean
    "sendAcknowledgeLetter": boolean
    "autoEmailMD": any
    "autoMailMergeMD": any
    "donorCoveredFeeFlag": any
    "donorCoveredFee": any
    "payLater": any
    "payments": Payments[]
    "status": string
    "taxDeductibleInfo": {
        "nonDeductibleAmount": number
        "taxDeducibleAmount": number
        "nonDeductibleDescription": any
    }
    "origin": any
}

class Payments {
    "id": string
    "amount": number
    "paymentStatus": string
    "note": any
    "tenderType": number
    "receivedDate": string
    "creditCardOnline": {
        "token": string
        "cardNumberLastFour": string
        "expirationMonth": number
        "expirationYear": number
        "cardTypeCode": string
        "cardHolderName": string
        "cardHolderEmail": string
        "billingAddress": {
            "addressLine1": string
            "addressLine2": string
            "city": string
            "stateProvinceCode": string
            "territory": any
            "countryId": string
            "zipCode": string
            "zipCodeSuffix": string
        }
        "transactionNumber": string
    }
    "creditCardOffline": any
    "ach": any
    "check": any
    "wire": any
    "inKind": any
    "dafpay": any
}



export class DonationsSearch {
    pagination!: Pagination
    searchResults!: DonationsSearchResult[]
}

export class DonationsSearchResult {
    "Soft Credit Amount"?: string
    "First Donation Amount"?: string
    "Donation Amount"?: string
    "Last Donation Amount"?: string
    "First Name"?: string
    "Cash Amount"?: string
    "Grant Asked Amount"?: string
    "Donation Date"?: string
    "Pledge Amount"?: string
    "Pledge Balance"?: number
    "Grant Funded Amount"?: string
    "Non-Deductible Amount Description"?: string
    "Pledge Total Amount Paid"?: string
    "Eligible Amount"?: string
    "Non-Deductible Amount"?: string
    "Tax-Deductible Amount"?: string
    "Donation ID"?: string
    "Donation Type"?: string
    "Commit Amount"?: string
    "Campaign ID"?: string
    "Pledge Write Off Amount"?: string
    "Grant Committed Amount"?: string
    "Last Name"?: string
    "Campaign Name"?: string
    "Account ID"?: string
    "CONDITIONS"?: string
    "Specific Student"?: string
    "Field of Study or Student Type"?: string
    "Gender"?: string
    "Sponsor ID"?: string
    balance_history?: BalanceHistory[]
}


export class SponsorsAssign {
    "Account ID": string
    "Sponsor ID": string
    "CONDITIONS": string
    "Donation ID": string
    "First Name": string
    "Specific Student": string
    "Field of Study or Student Type": string
    "Gender": string
    "Pledge Amount": string
    "Pledge Balance": string
    "Last Name": string
    "Campaign Name": string
    "Currency": string
    "Carryover": string
    // "balance_history": []
    "active": boolean
}

export class StudentsAssign {
    "studentId": string
    "studentName": string
    "gender": string
    "major": string
    "photoUrl": string
    "gradYear": number
    "gradMonthNum": number

    "field"?: string
    "laptop_cost"?: string
    "student_cost"?: number
    "operation_cost"?: number
    "student_balance"?: number
    "neon_account_id"?: string
    "sponsor_id"?: string
    "titulo"?: number
    "score"?: number
    "order"?: number
    "balance_history"?: BalanceHistory[]
    "active": boolean
}

export class BalanceHistory {
    "Account ID": string
    "Sponsor ID": string
    "sponsor_name":  string
    "balance_received":  string
}