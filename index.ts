// prototyping

interface JsonRefProperty<R = any> {
    $ref: R;
}
interface JsonStringProperty {
    type: 'string';
}
interface JsonNumberProperty {
    type: 'number';
}
interface JsonArrayProperty {
    type: 'array';
    items: JsonProperty;
}
interface JsonObjectProperty {
    type: 'object';
    properties: JsonProperties;
}

type JsonProperty = JsonArrayProperty | JsonNumberProperty | JsonStringProperty | JsonObjectProperty | JsonRefProperty;

interface JsonProperties {
    [key: string]: JsonProperty;
}

interface JsonSchema<T extends JsonProperties> {
    properties: T
}

type Properties<T> = T extends JsonSchema<infer U> ? U : T;

type UnpackedLayer3<T> =
    T extends JsonStringProperty ? string :
        T extends JsonNumberProperty ? number :
            never
    ;

type UnpackedLayer2<T, R1, R2, R3, R4, R5, R6> =
    T extends JsonStringProperty ? string :
        T extends JsonNumberProperty ? number :
            T extends JsonArrayProperty ? Array<UnpackedLayer3<T['items']>> :
                T extends JsonObjectProperty ? JsonSchemaType<T> :
                    T extends JsonRefProperty<UnpackedId<R1>> ? JsonSchemaType<R1> :
                        T extends JsonRefProperty<UnpackedId<R2>> ? JsonSchemaType<R2> :
                            T extends JsonRefProperty<UnpackedId<R3>> ? JsonSchemaType<R3> :
                                T extends JsonRefProperty<UnpackedId<R4>> ? JsonSchemaType<R4> :
                                    T extends JsonRefProperty<UnpackedId<R5>> ? JsonSchemaType<R5> :
                                        T extends JsonRefProperty<UnpackedId<R6>> ? JsonSchemaType<R6> :
                    never
    ;

type UnpackedLayer1<T, R1, R2, R3, R4, R5, R6> =
    T extends JsonStringProperty ? string :
        T extends JsonNumberProperty ? number :
            T extends JsonArrayProperty ? Array<UnpackedLayer2<T['items'], R1, R2, R3, R4, R5, R6>> :
                T extends JsonObjectProperty ? JsonSchemaType<T> :
                    T extends JsonRefProperty<UnpackedId<R1>> ? JsonSchemaType<R1> :
                        T extends JsonRefProperty<UnpackedId<R2>> ? JsonSchemaType<R2> :
                            T extends JsonRefProperty<UnpackedId<R3>> ? JsonSchemaType<R3> :
                                T extends JsonRefProperty<UnpackedId<R4>> ? JsonSchemaType<R4> :
                                    T extends JsonRefProperty<UnpackedId<R5>> ? JsonSchemaType<R5> :
                                        T extends JsonRefProperty<UnpackedId<R6>> ? JsonSchemaType<R6> :
                    never
    ;

type UnpackedLayer0<T, R1, R2, R3, R4, R5, R6> =
    T extends JsonStringProperty ? string :
        T extends JsonNumberProperty ? number :
            T extends JsonArrayProperty ? Array<UnpackedLayer1<T['items'], R1, R2, R3, R4, R5, R6>> :
                T extends JsonObjectProperty ? JsonSchemaType<T, R1> :
                    T extends JsonRefProperty<UnpackedId<R1>> ? JsonSchemaType<R1> :
                        T extends JsonRefProperty<UnpackedId<R2>> ? JsonSchemaType<R2> :
                            T extends JsonRefProperty<UnpackedId<R3>> ? JsonSchemaType<R3> :
                                T extends JsonRefProperty<UnpackedId<R4>> ? JsonSchemaType<R4> :
                                    T extends JsonRefProperty<UnpackedId<R5>> ? JsonSchemaType<R5> :
                                        T extends JsonRefProperty<UnpackedId<R6>> ? JsonSchemaType<R6> :
                                            never
    ;

type PropertyTypes<T, R1, R2, R3, R4, R5, R6> = { [K in keyof T]: UnpackedLayer0<T[K], R1, R2, R3, R4, R5, R6>};
type UnpackedId<T> = T extends { id: infer U } ? U : T;
type JsonSchemaType<T, R1 = any, R2 = any, R3 = any, R4 = any, R5 = any, R6 = any> = PropertyTypes<Properties<T>, R1, R2, R3, R4, R5, R6>;


const userSchema = {
    properties: {
        firstname: {
            type: 'string' as 'string',
        },
        lastname: {
            type: 'string' as 'string',
        },
        age: {
            type: 'number' as 'number',
        },
        girlfriend: {
            $ref: '/Friend' as '/Friend',
        },
        bestfriend: {
            type: 'object' as 'object',
            properties: {
                name: {type: 'string' as 'string'},
            },
        },
        friends: {
            type: 'array' as 'array',
            items: {
                $ref: '/Friend' as '/Friend'
            },
        },
    },
};

const friendSchema = {
    id: '/Friend' as '/Friend',
    type: 'object' as 'object',
    properties: {
        name: {type: 'string' as 'string'},
    },
};

type Friend = JsonSchemaType<typeof friendSchema>;
type User = JsonSchemaType<typeof userSchema, typeof friendSchema>;


const robin: User = {} as any;
