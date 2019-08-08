import { FormControl } from "@angular/forms";

export function PasswordValidator(control: FormControl) {
    let regex = new RegExp("[\\\s]");
    if (regex.test(control.value)) {
        return { password: 'should not contain `\\` or `space`' }
    } else {
        return null;
    }
}