var sum_to_n_a = function(n) {
    let sum = 0;

    for (let i = 1; i < n + 1; i++){
        sum += i;
    }

    return sum;
};

var sum_to_n_b = function(n) {
    let sum = 0;
    let i = 1;

    while (i < n + 1) {
        sum += i;
        i++;
    }

    return sum;
};

var sum_to_n_c = function(n) {
    return sum_to_n_c_recursive(0, n, 0);
};

function sum_to_n_c_recursive(i, n, sum){
    if (i == n) {
        return sum;
    } else {
        i++;
        sum += i;
        return sum_to_n_c_recursive(i, n, sum);
    }
}
