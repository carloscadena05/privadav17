export class Sponsor {
    "accountId"?: string
    "noSolicitation"?: boolean
    "login"?: {
        "username"?: string
        "password"?: string
    }
    "url"?: string
    "timestamps"?: {
        "createdBy"?: string
        "createdDateTime"?: string
        "lastModifiedBy"?: string
        "lastModifiedDateTime"?: string
    }
    "consent"?: null
    "accountCustomFields"?: AccountCustomFields[]
    "source"?: {
        "id"?: string
        "name"?: string
        "status"?: string
    }
    "primaryContact"?: {
        "accountId"?: string
        "contactId"?: string
        "firstName"?: string
        "middleName"?: string
        "lastName"?: string
        "prefix"?: string
        "suffix"?: string
        "salutation"?: string
        "preferredName"?: string
        "dob"?: {
            "day"?: string
            "month"?: string
            "year"?: string
        }
        "Gender"?: {
            "code"?: string
            "name"?: string
            "status"?: string
        }
        "email1"?: string
        "email2"?: string
        "email3"?: string
        "deceased"?: boolean
        "department"?: string
        "title"?: string
        "primaryContact"?: null
        "currentEmployer"?: null
        "startDate"?: string
        "endDate"?: string
        "addresses"?: [
            {
                "addressId"?: string
                "type"?: {
                    "id"?: string
                    "name"?: string
                    "status"?: string
                }
                "addressLine1"?: string
                "addressLine2"?: string
                "addressLine3"?: string
                "addressLine4"?: string
                "city"?: string
                "stateProvince"?: {
                    "code"?: string
                    "name"?: string
                    "status"?: string
                }
                "country"?: {
                    "id"?: string
                    "name"?: string
                    "status"?: string
                }
                "territory"?: string
                "county"?: string
                "zipCode"?: string
                "zipCodeSuffix"?: string
                "phone1"?: string
                "phone1Type"?: string
                "phone2"?: string
                "phone2Type"?: string
                "phone3"?: string
                "phone3Type"?: string
                "fax"?: string
                "faxType"?: string
                "isPrimaryAddress"?: boolean
                "validAddress"?: boolean
                "startDate"?: string
                "endDate"?: string
            }
        ]
    }
    "sendSystemEmail"?: boolean
    "email1OptOut"?: boolean
    "origin"?: {
        "originDetail"?: null
        "originCategory"?: string
    }
    "accountCurrentMembershipStatus"?: string
    "generosityIndicator"?: {
        "indicator"?: number
        "affinity"?: number
        "recency"?: number
        "frequency"?: number
        "monetaryValue"?: number
    }
    "sendTextOptIn"?: boolean
    "smsNumber"?: string
    "restrictFromWindfallSync"?: boolean
    "company"?: {
        "id"?: string
        "name"?: string
        "status"?: string
    }
    "facebookPage"?: string
    "twitterPage"?: string
    "individualTypes"?: IndividualTypes[]
    "roleVoList"?: null
}
export class AccountCustomFields {
    "id"?: string
    "name"?: string
    "value"?: string | null
    "optionValues"?: AccountCustomFields_OptionValues[]
}

class AccountCustomFields_OptionValues {
    "id"?: string
    "name"?: string
}

class IndividualTypes {
    "id"?: string
    "name"?: string
    "status"?: string
}