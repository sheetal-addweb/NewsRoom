import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const H2 = styled.div`
  font-size: 1.3rem;
    line-height: 1.15;
    margin: .5rem 0 .5rem;
    font-weight: 400;
`

class AccordionSection extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
        isOpen: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        this.props.onClick(this.props.label);
    };

    render () {
        const {
            onClick,
            props: { isOpen, label },
        } = this;

        return (
            <div
                style={{
                    background: isOpen ? '#f9f9f9' : '#e9ecef',
                    padding: '0.5rem 1rem 0.5rem 1rem',
                    borderRadius: '2px',
                    marginBottom: '1.5rem',
                    transition: 'all 1s ease'
                }}
            >
                <H2 onClick={onClick} style={{ cursor: 'pointer' }}>
                    {label}
                    <div style={{ float: 'right', transform: isOpen ? 'rotate(45deg)' : 'rotate(450deg)', transition: 'all 1s ease' }}>
                        {/*{!isOpen && <span>&#x2b;</span>}*/}
                        {<span>&#x2b;</span>}
                        {/*{isOpen && <span>&#x2212;</span>}*/}
                    </div>
                </H2>
                {isOpen && (
                    <div
                        style={{
                            background: 'transparent',
                            marginTop: 10,
                        }}
                    >
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}

export default AccordionSection;
