import styled from 'styled-components'
import Image from 'next/image'
import Logout from '../../../layouts/utils/Logout'


export default function ProfileInfo({ data }) {
    return (
        <Wrapper>
            <SubWrapper>
                <div className="img">
                    <Image src={"/images/profile.png"} width="400" height="200" alt="" />
                </div>

                <div className="user">
                    <div className="user-info">{data.email} {" "}

                    </div>
                    <div className="user-info">{data.username}</div>
                    <div className='verified'>
                        <Image src={"/images/verified.png"} width="400" height="200" alt="" />
                    </div>

                </div>

            </SubWrapper>
            {data.createdAt && <div>Member since {new Date(data.createdAt).toLocaleString()}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '20px' }}>

                <div>
                    ROLE: <span style={
                        (function () {

                            if (data.role == 'ADMIN' && !data.isSupperAdmin) {
                                return { color: 'blue' }
                            }
                            else if (data.role == 'AGENT' && !data.isSupperAdmin) {
                                return { color: 'purple' }
                            }
                            else if (data.role == 'ADMIN' && data.isSupperAdmin) {
                                return { color: 'red' }
                            }
                            else {
                                return { color: 'inherit' }
                            }
                        }())
                    }>{data.isSupperAdmin ? `SUPPER ADMIN` : data.role}
                    </span>
                </div>

                <div style={{ margin: '0 30px' }}>
                    <Logout />
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    transition: all 1s;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }

    .user {
        .user-info {
            font-weight: bold;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: .7rem;
            word-break:break-all;
        }
    }

    .verified {
        width: 20px;
        margin: 10px auto;
        height: 20px;
        border-radius: 50%;
    }

    .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto 20px auto;

        img {
            border-radius: 50%;
        }
    }

    .logout {
        position: absolute;
        right: 10px;
        bottom: 10px;  
        
        &:hover {
            opacity: .7
        }
    }
`

const SubWrapper = styled.div`
    min-height: 60px;
    width: 100%;
    background: ${({ theme }) => theme.card};
    padding: 20px 0;
`