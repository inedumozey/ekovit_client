import styled from 'styled-components'
import Skeleton from '../../../utils/components/Skeleton'


export default function Skeletons() {

    return (
        <Wrapper>
            <SubWrapper>
                <div className="img"><Skeleton type="round" /></div>

                <div className="user">
                    {
                        [1, 2, 3, 4, 5].map((item, i) => {
                            return (
                                <div key={i} className="user-info">
                                    <span style={{
                                        width: '150px',
                                        height: '20px',
                                        display: 'inline-block'
                                    }}>
                                        <Skeleton /></span>
                                </div>
                            )
                        })
                    }
                </div>

            </SubWrapper>

            <SubWrapper>
                {
                    [1, 2, 3, 4].map((item, i) => {
                        return (
                            <InputWrapper key={i}>
                                <span style={{
                                    width: '100%',
                                    height: '20px',
                                    display: 'inline-block'
                                }}>
                                    <Skeleton /></span>
                            </InputWrapper>
                        )
                    })
                }
            </SubWrapper>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    transition: all 1s;

    .user {
        .user-info {
            margin-bottom: 5px;
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

        @media (max-width: ${({ theme }) => theme.sm_screen}){
            margin: auto auto 20px auto;
        }
    }
`

const SubWrapper = styled.div`
    min-height: 60px;
    padding: 10px 0;
    width: 100%;
`

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 0px;
    padding: 5px 0;
`