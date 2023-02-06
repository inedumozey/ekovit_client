import styled from 'styled-components'
import Image from 'next/image'


export default function ProfileInfo({ data }) {
    return (
        <Wrapper>
            <SubWrapper>
                <div className="img">
                    <Image src={"/images/profile.png"} width="400" height="200" alt="" />
                </div>

                <div className="user">
                    <div className="user-info">{data.email} {" "}
                        <span className='verified'>
                            <Image src={"/images/verified.png"} width="400" height="200" alt="" />
                        </span>
                    </div>
                    <div className="user-info">{data.username}</div>
                    <div className="user-info">
                        <span style={
                            (function () {

                                if (data.role == 'ADMIN' && !data.isSupperAdmin) {
                                    return { color: 'blue' }
                                }
                                if (data.role == 'ADMIN' && data.isSupperAdmin) {
                                    return { color: 'red' }
                                }
                                else {
                                    return { color: 'inherit' }
                                }
                            }())
                        }> {data.Role} {data.isSupperAdmin ? `(SUPPER ADMIN)` : `(${data.role})`}
                        </span>
                    </div>
                </div>

            </SubWrapper>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    transition: all 1s;

    img {
        width: 100%;
        height: 100%;
    }

    .user {
        .user-info {
            margin-bottom: 5px;
            font-weight: bold;
            display: flex;
            align-items: center;

            .verified {
                width: 20px;
                margin-left: 5px;
                height: 20px;
                display: inline-flex;
                border-radius: 50%;
            }
        }
        
        @media (max-width: ${({ theme }) => theme.sm_screen}){
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 20px;

        img {
            border-radius: 50%;
        }

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            margin: auto auto 20px auto;
        }
    }
`

const SubWrapper = styled.div`
    min-height: 60px;
    padding: 10px;
    width: 100%;
`