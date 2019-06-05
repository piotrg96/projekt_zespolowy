import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import './Slider.css';

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
                                <div className="Slider-maxheight">
                                    <img className="img-fluid h-100 w-100 p-3" key={i} src={("http://localhost:49396/images/" + img.path)} alt={"avatar"}/>
                                </div>
                            </Page>)}
                        </Slider>
                    </Wrapper>
            </AppWrapper>
        );
    }
}

export { Photos };