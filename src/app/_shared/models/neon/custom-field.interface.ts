export class CustomField {
    "id": string
    "name": string
    "status": string
    "displayName": string
    "groupId": string
    "displayType": string
    "dataType": any
    "constituentReadOnly": boolean
    "component": string
    "optionValues": OptionValues[]
    "accountSettings": {
        "accountType": string
    }
    "eventSettings": any
    "membershipSettings": any
    "productSettings": any
}

export class OptionValues {
    "id": string
    "name": string
    "visibleOnPublicForms": boolean
    "visibleOnConstituentForms": boolean
}