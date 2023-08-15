import React, {FormEvent} from "react";
import {UserContext} from "../../App";
import {UserFormData} from "../../utilities/types.ts";


interface Props {
    user: UserContext;
}

interface State {
    passwordMismatch: boolean;
    error: string;
}

export default class SignUpForm extends React.Component<Props, State> {

    formData: UserFormData;

    constructor(props: Props) {
        super(props);

        this.formData = {
            username: "",
            email: "",
            password: "",
            confirm: "",
        };
        this.state = {
            passwordMismatch: false,
            error: "",
        };
    }

    handleOnChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const input = e.currentTarget;

        // make sure to set all inputEl.name to the correct values in FormData!
        this.formData[input.name as keyof UserFormData] = input.value;
    }

    submitHandler = (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = this.formData;

            if (data.username) {
                if (data.password !== data.confirm) {
                    this.setState({passwordMismatch: true});
                    return;
                }
                this.props.user.signUp(data);
            }

            this.setState({passwordMismatch: false});
        } catch {
            this.setState({error: "Sign up failed - Try Again"});
        }
    }

    render() {
        return (
            <>
                <h1>Sign-Up</h1>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.submitHandler}>
                        <label>Name</label>
                        <input type="text" name="username" required onChange={this.handleOnChange}/>

                        <label>Email</label>
                        <input type="email" name="email" required onChange={this.handleOnChange} />

                        <label>Password</label>
                        <input type="password" name="password" required onChange={this.handleOnChange}/>

                        <label>Confirm Password</label>
                        <input type="password" name="confirm" required onChange={this.handleOnChange}/>

                        {this.state.passwordMismatch && <p style={{color:"red"}}>Passwords must match</p>}

                        <div>
                            <button type="submit">Sign Up</button>
                        </div>

                    </form>
                </div>
            </>
        );
    }
}