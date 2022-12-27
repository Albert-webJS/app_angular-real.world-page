export interface InputElementForm {
    type: string;
    placeholder: string;
    controlName: string;
    hidden: boolean
}

export const INPUT_ELEMENT_FORMS: InputElementForm[] = [
    { type: "text", placeholder: "Your Name", controlName: "username", hidden: true },
    { type: "email", placeholder: "Email", controlName: "email", hidden: false },
    { type: "password", placeholder: "Password", controlName: "password", hidden: false},
]
