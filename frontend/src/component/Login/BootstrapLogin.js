import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Input, Row } from 'reactstrap'
import { login } from '../../store/users';
import AuthRouter from '../AuthRouter';
import "./Login.css";
import { Users } from './User';
const BootstrapLogin = () => {
    const dispatch = useDispatch();
    const [isFail, setIsFail] = useState(false);
    const [user, setUser] = useState({
        id: "",
        password: "",
    });
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const navigate = useNavigate();
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        const { isLogin } = await dispatch(login(user)).unwrap();

        if (isLogin) {
            navigate("/");
        } else {
            setIsFail(true);
            setTimeout(() => closeAlert(), 3000);
        }
    };

    const closeAlert = () => {
        setIsFail(false);
    };
    return (
        <div className="LoginPage">
            <Container className="bg-light border">
                <Row style={{ rowGap: "1em", padding: "3em" }}>
                    <Col xl={12}>
                        <img src="../img2/logo.jpg"  id="Loginimg" alt="Logo"></img>
                    </Col>

                    <Col xl={12}>
                        <Form onSubmit={onSubmitLogin} className="LoginForm">
                            {isFail ? (
                                <Alert color="warning" toggle={() => closeAlert()}>
                                    아이디 또는 비밀번호가 틀렸습니다.
                                </Alert>
                            ) : null}
                            <Input type="text" placeholder="ID" name="id" onChange={(e) => onChangeHandler(e)}></Input>
                            <Input type="password" placeholder="password" name="password" onChange={(e) => onChangeHandler(e)}></Input>
                            <Button type={"submit"} color="warning" block>
                                LOG IN
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-light border">
                <Row style={{ padding: "1em", textAlign: "center" }}>
                    <p>
                        계정이 없으신가요? <a href="/join">가입하기</a>
                    </p>
                </Row>
            </Container>
            <AuthRouter></AuthRouter>
        </div>
    );
};
export default BootstrapLogin;