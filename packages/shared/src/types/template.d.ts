
/**
 * Defines the base properties for any field in the schema.
 */
interface BaseField {
    description?: string;
    llm_info?: string;
    required?: boolean;
}

/**
 * Represents a simple string input field.
 */
export interface StringField extends BaseField {
    type: 'String';
}

/**
 * Represents a field that contains a list of items.
 * The `items` property defines the schema for each element in the array.
 */
export interface ArrayField extends BaseField {
    type: 'Array';
    arrangeable?: boolean;
    items: SchemaField; // Can be a StringField, ObjectField, or another ArrayField
}

/**
 * Represents a field that is a structured object with its own properties.
 */
export interface ObjectField extends BaseField {
    type: 'Object';
    // Allows for a flexible key-value structure, useful for the 'skills' section.
    additionalProperties?: { type: 'String' };
    // Defines the nested fields if the object has a fixed structure.
    properties?: { [key: string]: SchemaField };
}

/**
 * A union type representing any possible field in the schema.
 */
export type SchemaField = StringField | ObjectField | ArrayField;

/**
 * The root schema for the entire resume template.
 * It's a dictionary where keys are the top-level field names (e.g., "name", "contact").
 */
export type ResumeTemplateSchema = {
    [key: string]: SchemaField;
};
