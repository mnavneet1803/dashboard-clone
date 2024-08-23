import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { MdOutlineFileDownload } from "react-icons/md";

const Chart = ({ hw }) => {
    let data = [
        { Topic: 'Salary', Value: 2200 },
        { Topic: 'Freelance', Value: 1500 },
        { Topic: 'Investment', Value: 3000 },
    ];

    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState({ position: 'relative', radius: "50px" });

    const svgRef = useRef();

    const handleDownload = () => {
        const svgNode = svgRef.current;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgString = new XMLSerializer().serializeToString(svgNode);

        canvas.width = svgNode.clientWidth;
        canvas.height = svgNode.clientHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            const imageURL = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = 'Articles_Over_Category.png';
            link.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    };

    const calculateDimensions = () => {
        const margin = { top: 20, right: 40, bottom: 40, left: Math.round(hw.width / 4.9) < 260 ? 70 : 100 };
        const minWidth = 300; // Set a minimum width for mobile
        const calculatedWidth = Math.max(Math.round(hw.width / 4.6), minWidth) - margin.left - margin.right;
        const calculatedHeight = (Math.round(hw.height / 3.4) > 200 ? Math.round(hw.height / 3.4) : 200) - margin.top - margin.bottom;

        return { width: calculatedWidth, height: calculatedHeight, margin };
    };

    useEffect(() => {
        const { width, height, margin } = calculateDimensions();

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous SVG content

        const svgContainer = svg
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const getHighestValue = (array) => array.reduce((max, item) => Math.max(max, item.Value), -Infinity);

        const x = d3.scaleLinear()
            .domain([0, getHighestValue(data)])
            .range([5, width < 130 ? 120 : width]);

        svgContainer.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(4))
            .style("font-size", hw.width < 1400 ? "12px" : "15px")
            .selectAll(".domain, .tick line")
            .remove();

        const y = d3.scaleBand()
            .range([0, data.length < 3 ? height - 80 : height])
            .domain(data.map((d) => d.Topic))
            .padding(0.2);

        svgContainer.append("g")
            .call(d3.axisLeft(y))
            .style("font-size", hw.width < 1400 ? "12px" : "15px")
            .selectAll(".domain, .tick line")
            .remove();

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.Topic))
            .range(["#0384fc", "#a437ed", "#cc37ed", "#edad37", "#43c5e6", "#26994e"]);

        svgContainer.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", (d) => y(d.Topic))
            .attr("width", (d) => x(d.Value))
            .attr("height", y.bandwidth() - 2)
            .attr("rx", 3)
            .attr("ry", 20)
            .attr("fill", (d) => color(d.Topic));

        svgContainer.selectAll(".bar-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", (d) => {
                if (parseInt(d.Value) < 1000) {
                    return x(d.Value) + 7;
                } else {
                    return x(d.Value) - 50;
                }
            })
            .attr("y", (d) => y(d.Topic) + y.bandwidth() / 2)
            .text((d) => d.Value)
            .attr("dy", ".25em")
            .attr("fill", (d) => {
                if (parseInt(d.Value) < 1000) {
                    return color(d.Topic);
                } else {
                    return "white";
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
                width={calculateDimensions().width + calculateDimensions().margin.left + calculateDimensions().margin.right}
                height={calculateDimensions().height + calculateDimensions().margin.top + calculateDimensions().margin.bottom}
                ref={svgRef}
            />

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
