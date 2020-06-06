import React, { useRef, useEffect, useState } from 'react';

import { Container, Icon, NoDataParagraph, AbsoluteContainer , ScoreLabelSpan, ScoreValueSpan } from './styles';
import Chart from 'chart.js';

export const createTooltip = (data) => function CustomTooltip(tooltipModel) {
  if (!tooltipModel) {
    return;
  }
  
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip');
  
    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      document.body.appendChild(tooltipEl);
    }
  
    const indicator = `<div style='
        position: absolute;
        margin-left: -10px;
        top: 7px;
        ${tooltipModel.xAlign}: ${tooltipModel.xAlign === 'right' ? '-' : ''}5px;
        width: 0; height: 0;
        display: inline-block;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-${tooltipModel.xAlign === 'right' ? 'left' : 'right'}:5px solid ${tooltipModel.backgroundColor};
      '></div>`;
    tooltipEl.innerHTML = indicator.concat('<div class="root"></div>');
  
    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
  
    // Set Text
    if (tooltipModel.body) {

      let innerHtml = '';
      const sentence = data.sentences[tooltipModel.dataPoints ? tooltipModel.dataPoints[0].index : 0];
      const htmlMarkupSentence = sentence.markupSentence.replace(/<\/(negative|positive)>/g, '</span>').replace(/<negative>/g, '<span style="color: red;">')
      .replace(/<positive>/g, '<span style="color: green;">')
      innerHtml += `<p style="margin-bottom: 0;">Propoziția: "${htmlMarkupSentence}"</p>`;

      const colors = {
        neutral: 'gray',
        positive: 'green',
        'very positive': 'green',
        negative: 'red',
        'very negative': 'red'
      };
      const scores = {
        neutral: 'Neutru',
        positive: 'Pozitiv',
        'very positive': 'Foarte Pozitiv',
        negative: 'Negativ',
        'very negative': 'Foarte Negativ'
      };
      const sentenceScore = scores[sentence.sentenceSentiment];
      innerHtml += `<p style="margin-bottom: 0;">Scor: <span style="color:${colors[sentence.sentenceSentiment]};">${sentenceScore}</span></p>`;

      const emotions = [{
        emotion: 'joy',
        label: 'Fericire',
        color: 'green'
      }, {
        emotion: 'surprise',
        label: 'Mirare',
        color: 'green'
      }, {
        emotion: 'anger',
        label: 'Furie',
        color: 'red',
       }, {
         emotion: 'sadness',
         label: 'Tristețe',
         color: 'red'
        }, {
          emotion: 'fear',
          label: 'Frică',
          color: 'red',
         }, {
           emotion: 'disgust',
           label: 'Dezgust',
           color: 'red'
         }];

      let emotionLists = '';
      for (let emotionObj of emotions) {
        if (sentence.emotions[emotionObj.emotion]) {
          let listHtml = `<div style="margin-right: 18px;margin-top: 4px;" ><p style="margin: 0;text-decoration: underline;">${emotionObj.label}</p><ul style="list-style-type: disc;padding-left: 15px;margin-bottom: 10px;">`;
          for (let word of sentence.emotions[emotionObj.emotion]) {
            listHtml += `<li><span style="color: ${emotionObj.color};">${word}</span></li>`;
          }
          listHtml += '</ul></div>';
          emotionLists+= listHtml;
        }
      }
      
      innerHtml += `<div style="display: flex;">${emotionLists}</div>`;
  
      const tooltipRoot = tooltipEl.querySelector('.root');
      tooltipRoot.innerHTML = innerHtml;
    }
  
    // `this` will be the overall tooltip
    const position = this._chart.canvas.getBoundingClientRect();
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.x}px`;
    tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.y}px`;
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.padding = '4px 8px';
    tooltipEl.style.color = tooltipModel.bodyFontColor;
    tooltipEl.style.backgroundColor = tooltipModel.backgroundColor;
    tooltipEl.style.border = `1px solid ${tooltipModel.borderColor}`;
    tooltipEl.style.borderRadius = '6px';
    tooltipEl.style.pointerEvents = 'none';
  }

const ChartContainer = ({ data }) => {
    const canvas = useRef(null);
    const [showChart, setShowChart] = useState(!!data);
    const [chart, setChart] = useState(null);
    
    useEffect(() => {
      setShowChart(!!data);

      if(data) {
        const backgroundColor = data.sentences.map(s => {
          const colors = {
            neutral: '#CDCDCD',
            positive: '#9AE6B4',
            'very positive': '#68D391',
            negative: '#FC8181',
            'very negative': '#E53F3E'
          };
          return colors[s.sentenceSentiment]
        });

        const ctx = canvas.current.getContext('2d');

        if (chart) {
          chart.destroy();
        }

        setChart(new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: data.sentences.map(() => 1),
                    backgroundColor,
                    hoverBackgroundColor: backgroundColor
                }],
                labels: data.sentences.map((s, i) => `Propoziția ${i+1}`),
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                    align: 'end'
                },
                tooltips: {
                  bodyFontSize: 14,
                  borderColor: '#acacac',
                  backgroundColor: 'white',
                  bodyFontColor: 'black',
                    enabled: false,
                    custom: createTooltip(data)
                }
            }
        }))

        return () => {
          if(chart) {
            chart.destroy()
          }
        }
      }
      // eslint-disable-next-line
    }, [data]);

    const scores = {
      neutral: 'Neutru',
      positive: 'Pozitiv',
      negative: 'Negativ'
    };
    const scoreColors = {
      neutral: 'gray',
      positive: '#68D391',
      negative: '#E53F3E'
    };

    return (
        <Container style={{ position: 'relative' }}>
            <canvas ref={canvas}/>
            {!showChart ? (
              <AbsoluteContainer>
                <Icon className="fad fa-chart-pie"/>
                <NoDataParagraph>Nu sunt date</NoDataParagraph>
              </AbsoluteContainer>
            ): (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'none',
                position: 'relative',
                top: '-50%',
                transform: 'translateY(-50%)',
                height: '0px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '-20px'
              }}>
                <ScoreLabelSpan>Scor:</ScoreLabelSpan>
                <ScoreValueSpan style={{
                  color: scoreColors[data.textSentiment]
                }}>
                  { scores[data.textSentiment]}
                </ScoreValueSpan>
                </div>
             )}
        </Container>
    )
}

export default ChartContainer;
