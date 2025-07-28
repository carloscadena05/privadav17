export class SearchFields {
    "standardFields": StandardFields[]
    "customFields": CustomFields[]
}

export class StandardFields {
    "fieldName": string
    "operators": string[]
}

export class CustomFields {
    "displayName": string
    "id": number
    "operators": string[]
}

export class SearchFieldsFilter {
    "field": string
    "operator": string | null
    "value"?: string | null
    "operators_to_use"?: string[]
    "valueList"?: string[]
}