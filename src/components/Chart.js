import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button } from "react-bootstrap";
import { MdOutlineFileDownload } from "react-icons/md";
const Chart = ({ hw }) => {


    let data = [
        { Topic: 'Salary', Value: 2200 },
        { Topic: 'Freelance', Value: 1500 },
        { Topic: 'Investment', Value: 3000 },
    ]

    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState({ position: 'relative', radius: "50px" });


    const svgRef = useRef();


    const handleDownload = () => {
        const svgNode = svgRef.current;

        // Create a canvas element to render the SVG content
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgString = new XMLSerializer().serializeToString(svgNode);

        // Set canvas background color to white
        canvas.width = svgNode.clientWidth;
        canvas.height = svgNode.clientHeight;
        ctx.fillStyle = '#ffffff'; // white color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Create an image from the SVG content
        const img = new Image();
        img.onload = () => {
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Convert the canvas to a data URL
            const imageURL = canvas.toDataURL();
            // Trigger download
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = 'Articles_Over_Category.png';
            link.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    };
    const margin = { top: 20, right: 40, bottom: 40, left: Math.round(hw.width / 4.9) < 260 ? 70 : 100 };
    const width = (Math.round(hw.width / 4.9) > 100 ? Math.round(hw.width / 4.6) : 100) - margin.left - margin.right;
    const height = (Math.round(hw.height / 3.4) > 200 ? Math.round(hw.height / 3.4) : 200) - margin.top - margin.bottom;


    useEffect(() => {


        const svg = d3.select(svgRef.current);
        if (!svg.select("svg").empty()) {
            svg.select("svg").remove();
        }

        const svgContainer = svg
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);



        function getHighestValue(array) {
            let maxValue = -Infinity;

            array.forEach((item) => {
                if (item.Value && !isNaN(item.Value)) {
                    const value = parseInt(item.Value);
                    maxValue = Math.max(maxValue, value);
                }
            });

            return maxValue;
        }
        const x = d3
            .scaleLinear()
            .domain([0, getHighestValue(data)])
            .range([5, width < 130 ? 120 : width]);
        svgContainer
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(
                d3.axisBottom(x).ticks(4) // Adjust the outer tick size
            )
            .style("font-size", hw.width < 1400 ? "12px" : "15px")
            .selectAll(".domain, .tick line")
            .remove();

        // Y axis
        const y = d3
            .scaleBand()
            .range([0, data.length < 3 ? height - 80 : height])
            .domain(data.map((d) => d.Topic))
            .padding(0.2);
        svgContainer
            .append("g")
            .call(d3.axisLeft(y))
            .style("font-size", hw.width < 1400 ? "12px" : "15px")
            .selectAll(".domain, .tick line")
            .remove();

        const subgroups = [
            "Technical",
            "billing",
            "support",
            "bugs",
            "urgent",
            "performance",
        ];

        const color = d3
            .scaleOrdinal()
            .domain(subgroups)
            .range([
                "#0384fc",
                "#a437ed",
                "#cc37ed",
                "#edad37",
                "#43c5e6",
                "#26994e",
            ]);
        // Bars
        svgContainer
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", (d) => y(d.Topic))
            .attr("width", (d) => x(d.Value))
            .attr("height", y.bandwidth() - 2)
            .attr("rx", 3) // Set horizontal radius
            .attr("ry", 20) // Set vertical radius
            .attr("fill", (d) => color(d.Topic));

        // Text inside bars
        svgContainer
            .selectAll(".bar-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", (d) => {
                if (parseInt(d.Value) < 1000) {
                    return x(d.Value) + 7; // Position outside the bar
                } else {
                    return x(d.Value) - 50; // Position inside the bar
                }
            })
            .attr("y", (d) => y(d.Topic) + y.bandwidth() / 2)
            .text((d) => d.Value)
            .attr("dy", ".25em")
            .attr("fill", (d) => {
                if (parseInt(d.Value) < 1000) {
                    return color(d.Topic); // Bar color for smaller values
                } else {
                    return "white"; // White color for labels inside bars
                }
            })
            .style("font-size", hw.width < 1400 ? "15px" : "18px");
    }, [data, hw]);



    return (
        <div
            style={backgroundStyle}
            onMouseEnter={() => {
                setShowDownloadButton(true)
                setBackgroundStyle({ position: 'relative', backgroundColor: "#f0efef" })
            }}
            onMouseLeave={() => {
                setShowDownloadButton(false)
                setBackgroundStyle({ position: 'relative', radius: "50px" })
            }}

        >
            <svg
                width={(width + margin.left + margin.right) < 333 ? 333 :width + margin.left + margin.right} // Set width and height here
                height={height + margin.top + margin.bottom}
                ref={svgRef}
                style={backgroundStyle}
            >
                <g
                    transform={`translate(${hw.width / 12},${hw.width / 12})`}
                >
                </g>
            </svg>


            {/* Button to trigger download */}
            {showDownloadButton && (
                <button
                    className="btn"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        backgroundColor: "#626252"
                    }}
                    onClick={handleDownload}
                >
                    <MdOutlineFileDownload style={{ color: "white" }} />
                </button>
            )}
        </div>
    );

};

export default Chart;
