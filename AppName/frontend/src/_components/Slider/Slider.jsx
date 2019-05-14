import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Wrapper = styled.div`
    width: 100%;
    padding 32px;
`;

const Page = styled.div`
    width: 100%;
`;

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

class Photos extends React.Component {

    render(){
        return(
            <AppWrapper>
                    <Wrapper>
                        <Slider
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            infinite={false}
                            dots={true}
                            autoplay={true}
                        >
                            {this.props.photos.map((img, i) => 
                            <Page>
                                <img className="img-fluid w-100 h-auto p-1" key={i} src={img.path} alt="avatar"/>
                            </Page>)}
                        </Slider>
                    </Wrapper>
            </AppWrapper>
        );
    }
}

export { Photos };