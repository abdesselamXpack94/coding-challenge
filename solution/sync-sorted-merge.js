"use strict";
const MinHeap = require("./heap");

/**
 * log all logs within each log source
 * since the logs in a single source are sorted
 * then we could leverage a min heap to take care of
 * always displaying the oldest log first
 * the min heap will also fix the issue of having to load all the logs
 * at once as we would have done if we used an array or hashmap
 * which handles the heap out of memory issue when dealing with
 * thousands or millions of logs
 * 
 * 
 *
 * IMPORTANT:
 *  i decided to use a min heap because in this case even though it is slower than
 *  loading all data in an array but it is more reliable
 *  since if we use an array and load all the data beforhand and print it 
 *  this will exceed the heap limit allocation in memory and will result in a crash
 *  however using a min heap will always work no matter how many logs we have inside each 
 *  log source hence it is more reliable as a data structure for this case
 *
 *
 * @param {*} logSources sources to read from
 * @param {*} printer class to print logs
 */

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const heap = new MinHeap();

  logSources.forEach((source, index) => {
    heap.insert({ index, log: source.pop() });
  });

  while (heap.size > 0) {
    const { index, log } = heap.removeMin();
    if (!log) {
      break;
    }
    printer.print(log);

    const last = logSources[index].pop();
    if (last) {
      heap.insert({ index, log: last });
    }
  }
  printer.done();
};
