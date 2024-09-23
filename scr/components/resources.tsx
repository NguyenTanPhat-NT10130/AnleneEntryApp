// resources.ts

export const videoResources: { [key: string]: any } = {
    'Cơ': require('../../assets/Video_co.mp4'),
    'Xương': require('../../assets/Video_xuong.mp4'),
    'Khớp': require('../../assets/Video_khop.mp4'),
  };

  export const generateConfig = (resultSteps: any[]) => {
    return {
        case1: {
            firstResultText: { text: "HOÀN THÀNH BÀI KIỂM TRA", type: 'color', color: '#DF1E13' },
            secondResultText: { text: resultSteps[0]?.title || 'Loading...', type: 'color', color: '#DF1E13' },
            contentText: resultSteps[0]?.result || 'Loading...',
            borderType: 'color',
            validaText: {
              type: 'gradient', gradientColors: [
                  { color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }]
          },
            borderColor: '#ECD24A',
            gradientColors: [],
            gradientLocations: [],
        },
        case2: {
            firstResultText: {
                text: "HOÀN THÀNH BÀI KIỂM TRA", type: 'gradient', gradientColors: [
                    { color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }]
            },
            secondResultText: {
                text: resultSteps[2]?.title || 'Loading...', type: 'gradient', gradientColors: [
                    { color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }]
            },
            contentText: resultSteps[2]?.result || 'Loading...',
            borderType: 'gradient',
            validaText: {
                type: 'gradient', gradientColors: [
                    { color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }]
            },
            borderColor: '#000000',
            gradientColors: ['#376E48', '#187B33'],
            gradientLocations: [0, 0.3608],
        },
        case3: {
            firstResultText: { text: "HOÀN THÀNH BÀI KIỂM TRA", type: 'color', color: '#ECD24A' },
            secondResultText: {
                text: resultSteps[1]?.title || 'Loading...', type: 'gradient', gradientColors: [
                    { color: '#FFC200', offset: '1.14%' },
                    { color: '#F1ED86', offset: '35.63%' },
                    { color: '#ECD24A', offset: '60.84%' },
                    { color: '#FFC200', offset: '99.12%' }]
            },
            contentText: resultSteps[1]?.result || 'Loading...',
            borderType: 'color',
            borderColor: '#ECD24A',
            validaText: { type: 'color', color: '#ECD24A' },
            gradientColors: [],
            gradientLocations: [],
        },
    };
};

const caseSolutionConfig = (solutionSteps: any[]) => ({
  case1: {
      title: { text: solutionSteps[0]?.solutionTitle || 'Loading...', type: 'color', color: '#DF1E13' },
      firstSolutionText: solutionSteps[0]?.firstComments || 'Loading...',
      secondSolutionText: solutionSteps[0]?.secondComments || 'Loading...',
      adviceText: solutionSteps[0]?.advice || 'Loading...',
      gradientColors :[
        { color: "#FFC200", offset: "1.14%" },
        { color: "#FFFCAB", offset: "12.88%" },
        { color: "#ECD24A", offset: "49.11%" },
        { color: "#ECD24A", offset: "86.36%" },
        { color: "#FFC200", offset: "99.12%" },
    ],
      gradientLocations: [],
  },
  case2: {
      title: { text: solutionSteps[2]?.solutionTitle || 'Loading...', type: 'gradient', gradientColors: [{ color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }] },
      firstSolutionText: solutionSteps[2]?.firstComments || 'Loading...',
      secondSolutionText: solutionSteps[2]?.secondComments || 'Loading...',
      adviceText: solutionSteps[0]?.advice || 'Loading...',
      gradientColors: [{ color: '#376E48', offset: '-5.8%' }, { color: '#187B33', offset: '36.08%' }],
      
      gradientLocations: [0, 0.3608],
  },
  case3: {
      title: {
          text: solutionSteps[1]?.solutionTitle || 'Loading...', type: 'gradient', gradientColors: [
              { color: '#BA872C', offset: '-10.86%' },
              { color: '#E8E276', offset: '23%' },
              { color: '#E1D770', offset: '85.29%' },
              { color: '#885021', offset: '125.89%' }
          ]
      },
      firstSolutionText: solutionSteps[1]?.firstComments || 'Loading...',
      secondSolutionText: solutionSteps[1]?.secondComments || 'Loading...',
      adviceText: solutionSteps[0]?.advice || 'Loading...',
      gradientColors :[
        { color: "#FFC200", offset: "1.14%" },
        { color: "#FFFCAB", offset: "12.88%" },
        { color: "#ECD24A", offset: "49.11%" },
        { color: "#ECD24A", offset: "86.36%" },
        { color: "#FFC200", offset: "99.12%" },
    ],
      gradientLocations: [],
  },
});

export default caseSolutionConfig;
