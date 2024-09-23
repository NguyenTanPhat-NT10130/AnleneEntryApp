// utils/evaluateStepResults.ts
export const evaluateStepResults = (stepResults: boolean[]): string => {
    if (stepResults[0] === true && stepResults[1] === false && stepResults[2] === false && stepResults[3] === false) {
        return 'dangerous';
    } else if (stepResults[0] === true && stepResults[1] === true && stepResults[2] === true && stepResults[3] === false) {
        return 'safe';
    } else if (stepResults[0] === true && stepResults[1] === true && stepResults[2] === true && stepResults[3] === true) {
        return 'good';
    }
    return 'unknown'; // Giá trị mặc định nếu không thỏa mãn điều kiện nào
};
