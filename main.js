(function () {
                let yearsDropdown = ``;
                for (let i = 2019; i >= 1950; i--)
                    yearsDropdown += `<option value="${i}">${i}</option>`;

                document.getElementById('current_year').innerHTML = yearsDropdown;
                document.getElementById('birth_year').innerHTML = yearsDropdown;

                let now = moment();
                document.getElementById('current_year').value = now.year();
                document.getElementById('current_month').value = now.month() + 1;
                document.getElementById('current_day').value = now.date();
                document.getElementById('current_hour').value = now.hour();
                document.getElementById('current_minute').value = now.minute();



                document.getElementById('birth_year').value = "1996";
                document.getElementById('birth_month').value = "9";
                document.getElementById('birth_day').value = "14";
            })();

            function showBirthTime() {
                let btn = document.getElementById('btnTime');
                let x = document.getElementById('birth_time');
                if (x.style.display === "none") {
                    x.style.display = "block";
                    btn.innerText = 'Remove time';
                } else {
                    x.style.display = "none";
                    btn.innerText = 'Add time';
                }
            }

            function calculate() {
                let result_name = document.getElementById('txtName').value;

                let birth_year = document.getElementById('birth_year').value;
                let birth_month = document.getElementById('birth_month').value - 1;
                let birth_day = document.getElementById('birth_day').value;
                let birth_hour = document.getElementById('birth_hour').value;
                let birth_minute = document.getElementById('birth_minute').value;

                let current_year = document.getElementById('current_year').value;
                let current_month = document.getElementById('current_month').value - 1;
                let current_day = document.getElementById('current_day').value;
                let current_hour = document.getElementById('current_hour').value;
                let current_minute = document.getElementById('current_minute').value;

                let birth_date = moment(new Date(birth_year, birth_month, birth_day, birth_hour, birth_minute));
                let current_date = moment(new Date(current_year, current_month, current_day, current_hour, current_minute));

                let diff_years = current_year - birth_year;
                let diff_months = current_month - birth_month;
                let diff_days = current_day - birth_day;
                let diff_weeks = current_date.diff(birth_date, 'weeks');
                let total_seconds = current_date.diff(birth_date, 'seconds');

                const years = (total_seconds) => {
                    let seconds_of_year = 365 * 24 * 3600;
                    let years = parseInt(total_seconds / seconds_of_year);
                    let t = total_seconds % seconds_of_year;
                    return {
                        years: years,
                        rest: t
                    }
                }

                const months = (total_seconds) => {
                    let seconds_of_month = 30 * 24 * 3600;
                    let months = parseInt(total_seconds / seconds_of_month);
                    let t = total_seconds % seconds_of_month;
                    return {
                        months: months,
                        rest: t
                    }
                }

                const weeks = (total_seconds) => {
                    let seconds_of_week = 7 * 24 * 3600;
                    let weeks = parseInt(total_seconds / seconds_of_week);
                    let t = total_seconds % seconds_of_week;
                    return {
                        weeks: weeks,
                        rest: t
                    }
                }

                const days = (total_seconds) => {
                    let seconds_of_day = 24 * 3600;
                    let days = parseInt(total_seconds / seconds_of_day);
                    let t = total_seconds % seconds_of_day;
                    return {
                        days: days,
                        rest: t
                    }
                }

                const hours = (total_seconds) => {
                    let seconds_of_hour = 3600;
                    let hours = parseInt(total_seconds / seconds_of_hour);
                    let t = total_seconds % seconds_of_hour;
                    return {
                        hours: hours,
                        rest: t
                    }
                }

                const minutes = (total_seconds) => {
                    let seconds_of_minute = 60;
                    let minutes = parseInt(total_seconds / seconds_of_minute);
                    let t = total_seconds % seconds_of_minute;
                    return {
                        minutes: minutes,
                        seconds: t
                    }
                }

                const ageFull = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = years(seconds);
                    if (obj.years > 0)
                        strs.push(`${obj.years} years`);

                    strs.push(ageInMonths(obj.rest));

                    return strs.join(", ");
                };

                const ageInMonths = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = months(seconds);
                    if (obj.months > 0)
                        strs.push(`${obj.months} months`);

                    strs.push(ageInWeeks(obj.rest));
                    return strs.join(", ");


                };

                const ageInWeeks = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = weeks(seconds);
                    if (obj.weeks > 0)
                        strs.push(`${obj.weeks} weeks`);

                    strs.push(ageInDays(obj.rest));

                    return strs.join(", ");


                };

                const ageInDays = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = days(seconds);
                    if (obj.days > 0)
                        strs.push(`${obj.days} days`);

                    strs.push(ageInHours(obj.rest));

                    return strs.join(", ");
                };

                const ageInHours = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = hours(seconds);
                    if (obj.hours > 0)
                        strs.push(`${obj.hours} hours`);

                    strs.push(ageInMinutes(obj.rest));

                    return strs.join(", ");
                };


                const ageInMinutes = (seconds) => {
                    var obj = null;
                    let strs = [];

                    obj = minutes(seconds);
                    if (obj.minutes > 0)
                        strs.push(`${obj.minutes} minutes`);

                    if (obj.rest > 0)
                        strs.push(`${obj.rest} seconds`);

                    return strs.join(", ");
                };


                const nextBirthday = () => {
                    let birth_month = parseInt(document.getElementById('birth_month').value);
                    let birth_day = parseInt(document.getElementById('birth_day').value);

                    let current_year = parseInt(document.getElementById('current_year').value);
                    let current_month = parseInt(document.getElementById('current_month').value);
                    let current_day = parseInt(document.getElementById('current_day').value);

                    var a = moment([current_year + 1, birth_month - 1, birth_day]);
                    var b = moment([current_year, current_month - 1, current_day + 1]);
                    let y = a.diff(b, 'days');

                    return parseInt(y % 365);
                }

                document.getElementById('result_name').innerText = result_name;
                document.getElementById('result_full').innerText = ageFull(total_seconds);
                document.getElementById('result_month').innerText = `${ageInMonths(total_seconds)}`;
                document.getElementById('result_week').innerText = `${ageInWeeks(total_seconds)}`;
                document.getElementById('result_day').innerText = `${ageInDays(total_seconds)}`;
                document.getElementById('result_hour').innerText = `${ageInHours(total_seconds)}`;
                document.getElementById('result_minute').innerText = `${ageInMinutes(total_seconds)}`;
                document.getElementById('result_second').innerText = `${total_seconds} seconds`;
                document.getElementById('result_upcoming_birthday').innerText = `${nextBirthday()} days`;
                document.getElementById('results').style.display = 'block';
            }
