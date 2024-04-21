import React, { useState, useEffect } from 'react';
import "./Statistic.css";
import { useParams } from 'react-router-dom';
import AppService from '../../API/AppService';
import { useFetching } from '../../hooks/useFetching';
// import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const Statistic = () => {
    const params = useParams();
    const id = params.id;
    const [form, setForm] = useState([]);
    const [fetchForm, isFormLoading, formError] = useFetching(async () => {
        const response = await AppService.getStat(id);
        setForm(response.data);
    });

    useEffect(() => {
        fetchForm();
    }, []);
    console.log(form)

    useEffect(() => {
        const chartRefs = {};

        form.forEach((question, index) => {
            const ctx = document.getElementById(`chart-${index}`).getContext('2d');
            let chart;
            if (question.question_type === 'radio') {
                chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: question.choices.map(choice => choice.choice_title),
                        datasets: [{
                            data: question.choices.map(choice => choice.votes_count),
                            backgroundColor: [
                                'rgba(115,47,249, .8)',
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(102,255,0, 0.8)',
                                'rgba(98,65,32, 0.8)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                });
            } else {
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: question.choices.map(choice => choice.choice_title),
                        datasets: [{
                            data: question.choices.map(choice => choice.votes_count),
                            label: question.question_title,
                            backgroundColor: [
                                'rgba(115,47,249, .8)',
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(102,255,0, 0.8)',
                                'rgba(98,65,32, 0.8)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        
            chartRefs[index] = chart;
        });
        


        return () => {
            Object.values(chartRefs).forEach(chart => chart.destroy());
        };
    }, [form]);

    return (
        <div className='stat'>
            <div className='top'>
                <h1>Статистика опроса {id}</h1>
            </div>

            <div className='ques_stat'>
                {form && form.map((question, index) => (
                    <div className='one_ques' key={question.question_id}>
                        <h3>{question.question_title}</h3>
                        {/* <div style={{ position: 'relative', width: '40vw', height: '60vh' }}> */}
                        <div className='diagram'>
                            <canvas id={`chart-${index}`}></canvas>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistic;
